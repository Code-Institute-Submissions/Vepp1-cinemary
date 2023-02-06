import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";

function DropDownMenu() {
  return (
    <>
      <InputGroup className="flex-row-reverse">
        <DropdownButton variant="outline-secondary" id="input-group-dropdown-1">
          <Dropdown.Item href="">Edit Post</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="">Delete Post</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </>
  );
}

export default DropDownMenu;
