import { useEffect, useState, React } from "react";
import { createPortal } from "react-dom";

import { usePopper } from "react-popper";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";



import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";


export default function SideBar({ containers, toggleNavbar, setShowCreateListModel, setShowGroupModel, editList, getTasksInList }) {

  const [showPopup, setShowPopup] = useState(false);

  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar style={{ height: "90vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => toggleNavbar()}
          style={{ textAlign: "center" }}>
          {" "}
          <h4>Admin</h4>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
        <hr />

        {containers.map((container, index) => (
          <SubMenu
            label={
              <div className="side-nav-container-section">
                {container.name}
                <MoreVertIcon
                  // onClick={() =>
                  //   editContainer(container._id, container.name)
                  // }
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                />
              </div>
            }
            icon={<LibraryBooksIcon />}>
            {container.lists.map((list, index) => (
              <MenuItem icon={<ViewListIcon />}>
                <div
                  className="side-nav-list-section"
                  onClick={() => {
                    setCurrentListId(list._id);
                    getTasksInList();
                  }}
                  ref={setReferenceElement}>
                  {list.name}

                  <MoreVertIcon onClick={togglePopup} />
                  {showPopup &&
                    createPortal(
                      <div
                        className="options"
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}>
                        <div
                          class="option"
                          onClick={() =>
                            editList(list._id, list.name, container._id)
                          }>
                          <EditIcon fontSize="lg" />
                          Edit
                        </div>

                        <div class="option">
                          <DeleteOutlineIcon fontSize="lg" />
                          Delete
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
        ))}

        <div
          style={{
            display: "flex",
            marginTop: "90hv",
            position: "absolute",
            bottom: "0",
          }}>
          <MenuItem onClick={() => setShowCreateListModel(true)}>
            + New List
          </MenuItem>
          <MenuItem onClick={() => setShowGroupModel(true)}>New Group</MenuItem>
        </div>
        <br></br>
      </Menu>
    </Sidebar>
  );
}
