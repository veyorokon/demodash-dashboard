import React from "react";
import {
  Box,
  Flex,
  Text,
  CallToActionButton,
  Icon,
  Input,
  DropDown,
  Label
} from "components";
import {
  FlexInput,
  FlexField,
  FlexTextArea,
  FormSection,
  FormGroup,
  FlexText,
  FormButton
} from "views/Dashboard/Components";
import {connect} from "react-redux";
import {
  addVariationProductForm,
  deleteVariationProductForm,
  updateProductForm,
  addImageProductForm,
  deleteImageProductForm
} from "redux/actions";

import {Delete} from "@styled-icons/material/Delete";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Image} from "@styled-icons/boxicons-solid/Image";
import {Mutation} from "@apollo/react-components";
import {CREATE_PRODUCT, ACCOUNT_USER__PRODUCTS} from "./gql";
import {USER__ACCOUNT_USER_SET} from "views/Dashboard/gql";

import {
  responsive as r,
  getEventVal,
  getToken,
  formatGQLErrorMessage
} from "lib";

class ImageInput extends React.Component {
  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      if (file.size > (this.props.maxSize || 2097152))
        return this.props.onChange({
          errorMessage: "Image is too large! Max size allowed is 2MB."
        });
      reader.onloadend = () => {
        this.setState({
          file: file,
          base64: reader.result
        });
        return this.props.onChange({name: file.name, encoding: reader.result});
      };
    } catch {
      return null;
    }
  }

  render() {
    return (
      <>
        <Label
          hoverBackground="#FFC651"
          cursor="pointer"
          br={2}
          bg={"yellows.1"}
          display="flex"
          alignItems="center"
          h={"3.5rem"}
          w="25rem"
          maxWidth={"100%"}
          htmlFor="product-image-upload"
          {...this.props}
        >
          <Icon ml={3} mr={2} h={"2.2rem"}>
            <AddCircle />
          </Icon>
          <Text ml={4}>Add Image</Text>
        </Label>
        <Input
          display="none"
          onChange={evt => this.handleImageChange(evt)}
          id="product-image-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
        />
      </>
    );
  }
}

function getImageVariationOptions(variationData) {
  let options = [];
  for (var index in variationData) {
    const variation = variationData[index];
    if (variation.name && variation.choices) {
      for (var choiceIndex in variation.choices) {
        const choice = variation.choices[choiceIndex];
        if (choice)
          options.push({
            text: `${variation.name}: ${choice}`,
            value: [index, choiceIndex]
          });
      }
    }
  }
  return options;
}

class _FormCard extends React.Component {
  async createProductMutation(createProduct) {
    const {productForm, currentAccountUser, updateProductForm} = this.props;
    updateProductForm({
      ...productForm,
      isSubmitting: true
    });

    let flatForm = {...productForm};
    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.token = getToken().token;
    flatForm.variations = productForm.variations.data;
    let newImageData = [];
    for (var indx in flatForm.images.data) {
      let img = {...flatForm.images.data[indx]};
      if (img.variationLink === "-1")
        img.variationLink = [parseInt(img.variationLink)];
      else if (img.variationLink === -1)
        img.variationLink = [img.variationLink];
      else img.variationLink = img.variationLink.split(",").map(x => +x);
      newImageData.push(img);
    }
    flatForm.images = newImageData;
    flatForm.price = parseFloat(flatForm.price);
    try {
      await createProduct({
        variables: flatForm
      });
      return updateProductForm({
        name: "",
        description: "",
        disabled: true,
        isSubmitting: false,
        price: (0.0).toFixed(2),
        errorMessage: "",
        variations: {
          data: []
        },
        images: {
          data: [],
          errorMessage: ""
        },
        successMessage: "Product was successfully created!"
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateProductForm({
        ...productForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {
      productForm,
      addVariation,
      deleteVariation,
      updateProductForm,
      addImage,
      deleteImage,
      currentAccountUser
    } = props;
    const variationData = productForm.variations.data;
    let hasVariations = variationData && variationData.length ? true : false;

    const imageData = productForm.images.data;
    let hasImages = imageData && imageData.length ? true : false;
    let imgVariationOptions = getImageVariationOptions(variationData);
    let hasVariationOptions = imgVariationOptions.length ? true : false;

    const {disabled} = productForm;
    return (
      <Box
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        boxShadow="0 1px 6px rgba(57,73,76,0.35)"
        bg={"whites.0"}
        br={"4px"}
        {...props}
      >
        <FormSection>
          <Text fs="1.8rem" fw={500}>
            {props.title}
          </Text>
        </FormSection>

        <FormSection bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Product name:"} />
            <FlexInput
              value={productForm.name || ""}
              onChange={evt =>
                updateProductForm({
                  ...productForm,
                  name: getEventVal(evt),
                  disabled: false,
                  successMessage: ""
                })
              }
              mt={1}
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Description:"} />
            <FlexTextArea
              value={productForm.description || ""}
              onChange={evt =>
                updateProductForm({
                  ...productForm,
                  description: getEventVal(evt),
                  disabled: false,
                  successMessage: ""
                })
              }
              placeholder="About your product..."
              mt={1}
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Price:"} />
            <FlexInput
              mt={1}
              value={productForm.price}
              type="number"
              min="0"
              onBlur={evt =>
                updateProductForm({
                  ...productForm,
                  price: evt.target.value
                    ? parseFloat(evt.target.value).toFixed(2)
                    : (0.0).toFixed(2)
                })
              }
              onChange={evt =>
                updateProductForm({
                  ...productForm,
                  price: parseFloat(evt.target.value)
                })
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Variations:"} mb={2} />
            <Flex flexBasis="60%" flexDirection="column" h="fit-content">
              {variationData &&
                variationData.map((variation, index) => {
                  return (
                    <Flex key={index} flexDirection="column" h="fit-content">
                      <FlexText h="2.2rem" mb={1} mt={3}>
                        Variation name
                      </FlexText>
                      <FlexInput
                        value={variation.name || ""}
                        onChange={evt => {
                          variation.name = getEventVal(evt);
                          let newVariationData = [...variationData];
                          newVariationData[index] = variation;
                          updateProductForm({
                            ...productForm,
                            variations: {data: newVariationData},
                            disabled: false,
                            successMessage: ""
                          });
                        }}
                        placeholder="Color, size etc."
                      />
                      <Text mb={1} mt={2}>
                        Variation choices (one per line)
                      </Text>
                      <FlexTextArea
                        value={variation.choices.join("\n") || ""}
                        onChange={evt => {
                          variation.choices = getEventVal(evt).split("\n");
                          let newVariationData = [...variationData];
                          newVariationData[index] = variation;
                          updateProductForm({
                            ...productForm,
                            variations: {data: newVariationData},
                            disabled: false,
                            successMessage: ""
                          });
                        }}
                        placeholder="Variation choices..."
                      />
                      <FormButton
                        title="Delete this variation"
                        onClick={() => {
                          let conf = window.confirm(
                            "Are you sure you want to delete this variation?"
                          );
                          if (conf) return deleteVariation(index);
                        }}
                        mt={2}
                        mb={3}
                      >
                        <Flex alignItems="center">
                          <Icon ml={3} mr={2} h={"2.2rem"}>
                            <Delete />
                          </Icon>
                          <Text ml={4}>Delete variation</Text>
                        </Flex>
                      </FormButton>
                    </Flex>
                  );
                })}
              <Flex flexDirection="column" h="fit-content">
                <FormButton
                  title="Add a variation"
                  onClick={addVariation}
                  mt={hasVariations ? 3 : r("0 ----> 2")}
                  mb={hasVariations ? 3 : r("0 ----> 2")}
                >
                  <Flex alignItems="center">
                    <Icon ml={3} mr={2} h={"2.2rem"}>
                      <AddCircle />
                    </Icon>
                    <Text ml={4}>Add variation</Text>
                  </Flex>
                </FormButton>
              </Flex>
            </Flex>
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Images ( lim. 8 ):"} mb={2} />
            <Flex flexBasis="60%" flexDirection="column" h="fit-content">
              {imageData &&
                imageData.map((image, index) => {
                  return (
                    <Flex
                      maxWidth="25rem"
                      key={index}
                      flexDirection="column"
                      h="fit-content"
                    >
                      <FlexText h="2.2rem" mb={1} mt={3}>
                        Image name
                      </FlexText>
                      <Flex mt={1} mb={1} color="oranges.0" alignItems="center">
                        <Icon ml={3} mr={2} h={"2.2rem"}>
                          <Image />
                        </Icon>
                        <Text>{image.name}</Text>
                      </Flex>

                      {hasVariationOptions && (
                        <>
                          <Text mb={1} mt={2}>
                            Optional
                          </Text>
                          <Flex>
                            <DropDown
                              options={imgVariationOptions}
                              br={2}
                              maxWidth="100%"
                              w="25rem"
                              border={"1px solid lightslategrey"}
                              defaultOption={"Link image to variation"}
                              value={image.variationLink || -1}
                              onChange={evt => {
                                image.variationLink = getEventVal(evt);
                                let newImageData = [...imageData];
                                newImageData[index] = image;
                                updateProductForm({
                                  ...productForm,
                                  images: {data: newImageData},
                                  disabled: false,
                                  successMessage: ""
                                });
                              }}
                              {...props}
                            />
                          </Flex>
                          <Text mb={1} mt={1}>
                            Max: one per variation
                          </Text>
                        </>
                      )}
                      <FormButton
                        mt={2}
                        mb={2}
                        title="Delete this image"
                        onClick={() => {
                          let conf = window.confirm(
                            "Are you sure you want to delete this image?"
                          );
                          if (conf) return deleteImage(index);
                        }}
                      >
                        <Flex alignItems="center">
                          <Icon ml={3} mr={2} h={"2.2rem"}>
                            <Delete />
                          </Icon>
                          <Text ml={4}>Delete this image</Text>
                        </Flex>
                      </FormButton>
                    </Flex>
                  );
                })}
              {imageData && imageData.length < 8 ? (
                <ImageInput
                  onChange={result => addImage(result)}
                  mt={hasImages ? 3 : r("0 ----> 2")}
                  mb={productForm.images.errorMessage ? 2 : 0}
                />
              ) : (
                <Flex
                  justifyContent="center"
                  w="25rem"
                  maxWidth="100%"
                  mt={3}
                  mb={1}
                >
                  <Text textAlign="center" color="greens.4">
                    Maximum images added
                  </Text>
                </Flex>
              )}
              {productForm.images.errorMessage && (
                <Flex w="25rem" maxWidth="100%" mb={2}>
                  <Text color="oranges.0">
                    {productForm.images.errorMessage}
                  </Text>
                </Flex>
              )}
            </Flex>
          </FormGroup>
        </FormSection>

        <FormSection
          justifyContent={[
            "center",
            "center",
            "center",
            "center",
            "center",
            "flex-end"
          ]}
          flexDirection={r("column ----> row")}
          alignItems="center"
        >
          {productForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {productForm.errorMessage}
              </Text>
            </Flex>
          )}
          {productForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {productForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation
            mutation={CREATE_PRODUCT}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              },
              {
                query: ACCOUNT_USER__PRODUCTS,
                variables: {
                  token: getToken().token,
                  id: parseInt(currentAccountUser)
                }
              }
            ]}
          >
            {createProduct => (
              <CallToActionButton
                disabled={disabled}
                cursor={disabled ? "no-drop" : "pointer"}
                hoverBackground={disabled ? "#ffb39f" : "#F87060"}
                bg={disabled ? "#ffb39f" : "oranges.1"}
                color={"whites.0"}
                hoverColor={disabled ? "whites.2" : "whites.0"}
                br={2}
                w={r("100% 25rem ---> 10rem")}
                maxWidth="100%"
                fs={"1.6rem"}
                onClick={() => this.createProductMutation(createProduct)}
              >
                {productForm.isSubmitting ? "Saving..." : "Save"}
              </CallToActionButton>
            )}
          </Mutation>
        </FormSection>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    productForm: state.productForm,
    currentAccountUser: state.dashboard.currentAccountUser
  };
};
function mapDispatchToProps(dispatch) {
  return {
    addVariation: payload => dispatch(addVariationProductForm(payload)),
    deleteVariation: payload => dispatch(deleteVariationProductForm(payload)),
    updateProductForm: payload => dispatch(updateProductForm(payload)),
    addImage: payload => dispatch(addImageProductForm(payload)),
    deleteImage: payload => dispatch(deleteImageProductForm(payload))
  };
}

const FormCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormCard);

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <FormCard title={"Add a product"} />
    </Flex>
  );
};
