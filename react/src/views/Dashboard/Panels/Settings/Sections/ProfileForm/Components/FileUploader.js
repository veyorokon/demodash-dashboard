import React from "react";
import {Label, Icon, Text, Input} from "components";

class FileInput extends React.Component {
  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      if (file.size > (this.props.maxSize || 2097152))
        return this.props.onChange({
          errorMessage: "Logo is too large! Max size allowed is 2MB."
        });
      reader.onloadend = () => {
        this.setState({
          file: file,
          base64: reader.result
        });
        return this.props.onChange({
          name: file.name,
          encoding: reader.result.replace("data:image/svg+xml;base64,", "")
        });
      };
    } catch {
      return null;
    }
    let fileInput = document.getElementById(this.props.inputName);
    fileInput.value = null;
  }

  render() {
    const {props} = this;
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
          htmlFor={props.inputName}
          {...props}
        >
          <Icon ml={3} mr={2} h={"2.2rem"}>
            {props.icon}
          </Icon>
          <Text ml={4}>{props.children}</Text>
        </Label>
        <Input
          display="none"
          onChange={evt => this.handleImageChange(evt)}
          id={props.inputName}
          type="file"
          accept=".svg"
        />
      </>
    );
  }
}

export default FileInput;
