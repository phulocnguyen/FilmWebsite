import React, { useEffect, useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import Container from "../../components/common/Container.jsx";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import uiConfigs from "../../configs/ui.configs.js";
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const handleOpen = (userName) => {
    setOpen(true);
    setSelectedUserName(userName);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await accountApi.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [users]);

  const handleSelectUser = (userName) => {
    const selectedIndex = selectedUsers.indexOf(userName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, userName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelected);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const scrollToCharacter = (character) => {
    if (character != "") {
      let index = users.findIndex((user) =>
        user.username.toLowerCase().startsWith(character)
      );
      if (index === -1) {
        index = users.findIndex((user) =>
          user.name.toLowerCase().startsWith(character)
        );
      }
      if (index === -1) {
        index = users.findIndex((user) =>
          user.email.toLowerCase().startsWith(character)
        );
      }
      if (index !== -1) {
        const tableRow = document.getElementById(
          `row-${users[index].username}`
        );
        if (tableRow) {
          tableRow.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const HandleDeleteAccounts = async (usersToDelete) => {
    try {
      if (Array.isArray(usersToDelete)) {
        for (const user of usersToDelete) {
          console.log("th1: " + user);
          const data ={
            username: user,
          };
          await accountApi.adminDeleteAccount(JSON.stringify(data));
        }
      } else {
        console.log("th2: "+ usersToDelete);
        const data ={
          username: usersToDelete,
        };
        await accountApi.adminDeleteAccount(data).then((res) => {
              if(res.success){
                console.log("Delete success");
              }else{
                console.log("Delete failed");
              }
        });
      }
      const response = await accountApi.getAllUsers();
      setUsers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to delete accounts:", error);
    }
    setOpen(false);
  };
  

  return (
    <Box sx={{ margin: "2em" }}>
      <Stack
        direction="row"
        sx={{ marginBottom: "2em" }}
        justifyContent="center"
      >
        <Box width="50%">
          <Container header={"Admin"}></Container>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" width="50%">
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ marginBottom: "1em", width: "78%" }}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
                event.preventDefault();
                scrollToCharacter(searchText);
              }
            }}
          />
          <IconButton
            onClick={() => scrollToCharacter(searchText)}
            size="large"
            aria-label="delete"
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedUsers.length > 0 &&
                  selectedUsers.length < users.length
                }
                checked={selectedUsers.length === users.length}
                onChange={() => {
                  if (selectedUsers.length === users.length) {
                    setSelectedUsers([]);
                  } else {
                    setSelectedUsers(users.map((user) => user.username));
                  }
                }}
              />
            </TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>
              <Button
                onClick={() => handleOpen(selectedUsers)}
                size="small"
                aria-label="delete"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username} id={`row-${user.username}`}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.indexOf(user.username) !== -1}
                  onChange={() => handleSelectUser(user.username)}
                />
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleOpen(user.username)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            sx={{ ...uiConfigs.style.typoLines(2, "center") }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure to delete account{" "}
            <b>
              {Array.isArray(selectedUserName)
                ? selectedUserName.join(", ")
                : selectedUserName}
            </b>
            ?
          </Typography>
          <Stack marginTop="2em" direction="row" justifyContent="space-evenly">
            <Button
              onClick={() => HandleDeleteAccounts(selectedUserName)}
              variant="outlined"
              size="medium"
            >
              Yes
            </Button>
            <Button onClick={handleClose} variant="outlined" size="medium">
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminPage;
