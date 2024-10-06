import { useEffect, useState, useRef, React } from "react";
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

export default function SideBar({
  containers,
  isNavbarOpen,
  setIsNavbarOpen,
  setShowCreateListModel,
  setShowContainerModel,
  editList,
  deleteList,
  editContainer,
  getTasksInList,
  setCurrentListId,
}) {
  const listReferenceElements = useRef([]);
  const containerReferenceElements = useRef([]);
  // const listPopperElements = useRef([]);


  const setRef = (element, index) => {
    listReferenceElements.current[index] = element;
  };

  const setContainerRef = (element, index) => {
    containerReferenceElements.current[index] = element;
  }

  const [currentListName, setCurrentListName] = useState()
  const [currentListContainer, setCurrentListContainer] = useState()
  const [currentListIdForPortal, setCurrentListIdForPortal] = useState()

  const [currentContainerName, setCurrentContainerName] = useState()
  const [currentContainerId, setCurrentContainerId] = useState()

  const [showEditListPopup, setShowEditListPopup] = useState(false);
  const [showEditAndDeleteContainerPopup, setShowEditAndDeleteContainerPopup] = useState(false);


  const [listPopperElement, setListPopperElement] = useState();
  const [containerPopperElement, setContainerPopperElement] = useState();


  const [currentListIndex, setCurrentListIndex] = useState(null);
  const [currentContainerIndex, setCurrentContainerIndex] = useState(null);

  const { styles, attributes} = usePopper(
    listReferenceElements.current[currentListIndex],
    listPopperElement,
    {
      placement: "left",
    }
  );

  const { styles:containerStyles, attributes:containerAttributes} = usePopper(
    containerReferenceElements.current[currentContainerIndex],
    containerPopperElement,
    {
      placement: "left",
    }
  );



  const toggleListEditPopup = (index) => {
    setCurrentListIndex(index);
    setShowEditListPopup(!showEditListPopup);
  };


  const toggleContainerEditAndDeletePopup = (index) => {
    setCurrentContainerIndex(index)
    setShowEditAndDeleteContainerPopup(!showEditAndDeleteContainerPopup);
  };


  const { collapseSidebar } = useProSidebar();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    collapseSidebar();
  };

  return (
    <Sidebar style={{ height: "90vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={toggleNavbar}
          style={{ textAlign: "center" }}>
          <h4>Admin</h4>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
        <hr />

        {containers.map((container, index) => (
          <SubMenu
            key={index}
            label={
              <div className="side-nav-container-section">
                {container.name}
                <MoreVertIcon
                  ref={(el) => setContainerRef(el, index)}
                  onClick={() => {toggleContainerEditAndDeletePopup(index)
                  setCurrentContainerId(container._id)
                  setCurrentContainerName(container.name)
                  }
                  }
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                />

                {showEditAndDeleteContainerPopup &&
                  createPortal(
                    <div
                      className="options"
                      style={containerStyles.popper}
                      ref={setContainerPopperElement}
                      {...containerAttributes.popper}>
                      <div
                        class="option"
                        onClick={() => editContainer(currentContainerId, currentContainerName)}>
                        <EditIcon fontSize="lg" />
                        Edit
                      </div>

                      <div
                        class="option"
                        onClick={() =>
                          deleteContainer(list._id, container._id)
                        }>
                        <DeleteOutlineIcon fontSize="lg" />
                        Delete
                      </div>
                    </div>,
                    document.body
                  )}
              </div>
            }
            icon={<LibraryBooksIcon />}>
            {container.lists.map((list, listIndex) => {
              const listIndexRef = `${index}-${listIndex}`
              return (
                <MenuItem icon={<ViewListIcon />}>
                  <div
                    className="side-nav-list-section"
                    onClick={() => {
                      setCurrentListId(list._id);
                      getTasksInList();
                    }}>
                    {list.name}

                    <MoreVertIcon
                      onClick={() =>{ toggleListEditPopup(listIndexRef);
                        setCurrentListIdForPortal(list._id);
                        setCurrentListName(list.name);
                        setCurrentListContainer(container._id);
                      }}
                      ref={(el) => setRef(el, listIndexRef)}      
                      
                    />

                    {showEditListPopup &&
                      createPortal(
                        <div
                          className="options"
                          ref={setListPopperElement}
                          style={styles.popper}
                          {...attributes.popper}>
                          <div
                            class="option"
                            onClick={() =>
                              editList(currentListIdForPortal, currentListName, currentListContainer)
                            }>
                            <EditIcon fontSize="lg" />
                            Edit
                          </div>

                          <div
                            class="option"
                            onClick={() => deleteList(currentListIdForPortal, currentListName)}>
                            <DeleteOutlineIcon fontSize="lg" />
                            Delete
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                </MenuItem>
              );
            })}
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
          <MenuItem onClick={() => setShowContainerModel(true)}>New Group</MenuItem>
        </div>
        <br></br>
      </Menu>
    </Sidebar>
  );
}
