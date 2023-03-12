import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";

import styled from "styled-components";
import FormButton from "../../components/FormButton";
import Menu from "../../components/Menu";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import { User } from "../../types/User";
import { ChangeUserRole, GetAllUser } from "../../lib/user.hooks";

const AccountsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userToEdit, setUserToEdit] = useState<User>();

  const [users, setUsers] = useState<User[]>();

  const [userRecentRole, setUserRecentRole] = useState("");

  const [onLoadingSave, setOnLoadingSave] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await GetAllUser();
      setUsers(data as User[]);
    })();
  }, [isModalOpen]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row: User) =>
          row.firstName.toUpperCase() + " " + row.surname.toUpperCase()
      },
      {
        name: "Campus",
        selector: (row: User) => row.campus.toUpperCase()
      },
      {
        name: "Role",
        selector: (row: User) => row.role?.toUpperCase()!
      },
      {
        cell: (user: User) => (
          <FormButton text="Edit" onClicked={() => onEdit(user)} />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      }
    ],
    []
  );

  const tableCustomStyle = {
    headCells: {
      style: {
        fontSize: "20px"
      }
    },
    cells: {
      style: {
        fontSize: "20px",
        margin: "20px 0px"
      }
    }
  };

  const onEdit = (user: User) => {
    setUserToEdit(user);
    setUserRecentRole(user.role!);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setUserToEdit(undefined);
    setIsModalOpen(false);
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const onSelectRoleChangeHandler = (event: SelectChangeEvent) => {
    setUserToEdit({
      ...userToEdit!,
      role: event.target.value!
    });
  };

  const onSave = async () => {
    setOnLoadingSave(true);
    try {
      await ChangeUserRole(userToEdit?.email!, userToEdit?.role!);
      setUserToEdit(undefined);
    } catch (e) {
      return e;
    }
    setOnLoadingSave(false);
    setIsModalOpen(false);
  };

  return (
    <MainContainer>
      <TopNav profileHandler={() => {}} />
      <div
        style={{ display: "flex", flexDirection: "row", position: "relative" }}
      >
        <Menu
          isFacultySubmenuOpen={false}
          facultySubMenuHandler={() => {}}
          position="relative"
        />
        <BodyContainer>
          <ScreenTitle title="Accounts" />
          <Container>
            <DataTable
              columns={columns}
              data={users!}
              customStyles={tableCustomStyle}
              pagination
              paginationRowsPerPageOptions={[5, 10]}
            />
          </Container>
          <Modal open={isModalOpen}>
            <Box sx={modalStyle}>
              <Typography variant="h6" mb={5}>
                Edit
              </Typography>
              <Box mb={10} paddingLeft={2}>
                <Typography paddingBottom={2}>
                  Name:{" "}
                  {userToEdit?.firstName.toUpperCase()! +
                    " " +
                    userToEdit?.surname.toUpperCase()}
                </Typography>
                <Typography paddingBottom={2}>
                  {userToEdit?.campus.toUpperCase()}
                </Typography>
                <Select
                  defaultValue={userToEdit?.role}
                  value={userToEdit?.role}
                  onChange={onSelectRoleChangeHandler}
                >
                  <MenuItem value={"Department Chairperson"}>
                    Department Chairperson
                  </MenuItem>
                  <MenuItem value={"System Administrator"}>
                    System Administrator
                  </MenuItem>
                  <MenuItem value={"Faculty"}>Faculty</MenuItem>
                  <MenuItem value={"OVPAA"}>OVPAA</MenuItem>
                </Select>
              </Box>

              <Box
                justifyContent={"space-evenly"}
                flexDirection={"row"}
                display={"flex"}
              >
                <FormButton
                  text="Save"
                  onClicked={onSave}
                  disabled={userToEdit?.role === userRecentRole}
                  isSubmitting={onLoadingSave}
                />
                <FormButton text="Close" onClicked={onModalClose} />
              </Box>
            </Box>
          </Modal>
        </BodyContainer>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 15px;
  margin: 120px auto;
  width: 80%;
`;

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default AccountsScreen;
