import React from "react";
import {Box, Flex, Text, CallToActionButton, Icon} from "components";
import {
  FlexInput,
  FlexField,
  FlexTextArea,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {connect} from "react-redux";
import {
  addVariationProductForm,
  deleteVariationProductForm,
  updateProductForm
} from "redux/actions";

import {Delete} from "@styled-icons/material/Delete";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {responsive as r, getEventVal} from "lib";

const FormButton = props => (
  <CallToActionButton
    hoverBackground="#FFC651"
    br={2}
    bg={"yellows.1"}
    w="25rem"
    maxWidth={"100%"}
    cursor={"pointer"}
    {...props}
  >
    {props.children}
  </CallToActionButton>
);

const _FormCard = props => {
  const {productForm, addVariation, deleteVariation, updateProductForm} = props;
  const variationData = productForm.variations.data;
  let hasVariations = variationData.length ? true : false;
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
                name: getEventVal(evt)
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
                description: getEventVal(evt)
              })
            }
            placeholder="About your product..."
            mt={1}
          />
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Variations:"} mb={2} />
          <Flex flexBasis="60%" flexDirection="column" h="fit-content">
            {variationData &&
              variationData.map((variation, index) => {
                return (
                  <Flex key={index} flexDirection="column" h="fit-content">
                    <Text mb={1} mt={2}>
                      Variation name
                    </Text>
                    <FlexInput
                      value={variation.name || ""}
                      onChange={evt => {
                        variation.name = getEventVal(evt);
                        let newVariationData = [...variationData];
                        newVariationData[index] = variation;
                        updateProductForm({
                          ...productForm,
                          variations: {data: newVariationData}
                        });
                      }}
                      placeholder="Color, size etc."
                    />
                    <Text mb={1} mt={2}>
                      Variation choices (one per line)
                    </Text>
                    <FlexTextArea
                      value={variation.choices || ""}
                      onChange={evt => {
                        variation.choices = getEventVal(evt);
                        let newVariationData = [...variationData];
                        newVariationData[index] = variation;
                        updateProductForm({
                          ...productForm,
                          variations: {data: newVariationData}
                        });
                      }}
                      placeholder="Variation choices..."
                    />
                    <FormButton
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
                onClick={() => addVariation()}
                mt={hasVariations ? 4 : r("0 ----> 2")}
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
      </FormSection>

      <FormSection justifyContent="flex-end">
        <Text fs="1.6rem" fw={500}>
          Save
        </Text>
      </FormSection>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    productForm: state.productForm
  };
};
function mapDispatchToProps(dispatch) {
  return {
    addVariation: payload => dispatch(addVariationProductForm(payload)),
    deleteVariation: payload => dispatch(deleteVariationProductForm(payload)),
    updateProductForm: payload => dispatch(updateProductForm(payload))
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
