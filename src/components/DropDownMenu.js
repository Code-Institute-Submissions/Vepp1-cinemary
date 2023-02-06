import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";

function DropDownMenu({ message1, message2 }) {
  return (
    <>
      <InputGroup className="flex-row-reverse">
        <DropdownButton variant="outline-secondary" id="input-group-dropdown-1">
          <Dropdown.Item href="">{message1}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="">{message2}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </>
  );
}

export default DropDownMenu;
