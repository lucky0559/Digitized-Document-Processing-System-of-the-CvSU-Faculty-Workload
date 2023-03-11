import { useMemo, useState } from "react";
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

type UserToEdit = {
  id: string;
  name: string;
  campus: string;
  role: string;
};

const AccountsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userToEdit, setUserToEdit] = useState<UserToEdit>();

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row: UserToEdit) => row.name
      },
      {
        name: "Campus",
        selector: (row: UserToEdit) => row.campus
      },
      {
        name: "Role",
        selector: (row: UserToEdit) => row.role
      },
      {
        cell: (row: UserToEdit) => (
          <FormButton text="Edit" onClicked={() => onEdit(row)} />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      }
    ],
    []
  );

  const data = [
    {
      id: "1",
      name: "Lucky 1",
      campus: "CEIT",
      role: "Developer"
    },
    {
      id: "2",
      name: "Lucky 2",
      campus: "CAS",
      role: "QA"
    },
    {
      id: "3",
      name: "Lucky 3",
      campus: "CSPEAR",
      role: "Designer"
    },
    {
      id: "4",
      name: "Lucky 4",
      campus: "CEMDS",
      role: "Unicorn"
    },
    {
      id: "5",
      name: "Lucky 1",
      campus: "CEIT",
      role: "Developer"
    },
    {
      id: "6",
      name: "Lucky 2",
      campus: "CAS",
      role: "QA"
    },
    {
      id: "7",
      name: "Lucky 3",
      campus: "CSPEAR",
      role: "Designer"
    },
    {
      id: "8",
      name: "Lucky 4",
      campus: "CEMDS",
      role: "Unicorn"
    },
    {
      id: "9",
      name: "Lucky 1",
      campus: "CEIT",
      role: "Developer"
    },
    {
      id: "10",
      name: "Lucky 2",
      campus: "CAS",
      role: "QA"
    },
    {
      id: "13",
      name: "Lucky 3",
      campus: "CSPEAR",
      role: "Designer"
    },
    {
      id: "14",
      name: "Lucky 4",
      campus: "CEMDS",
      role: "Unicorn"
    }
  ];

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

  const onEdit = (row: UserToEdit) => {
    setUserToEdit(row);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setUserToEdit({
      id: "",
      name: "",
      campus: "",
      role: ""
    });
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

  const onSave = () => {
    console.log(userToEdit);
    setIsModalOpen(false);
    setUserToEdit({
      id: "",
      name: "",
      campus: "",
      role: ""
    });
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
              data={data}
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
                  Name: {userToEdit?.name}
                </Typography>
                <Typography paddingBottom={2}>{userToEdit?.campus}</Typography>
                <Select
                  defaultValue={userToEdit?.role}
                  value={userToEdit?.role}
                  onChange={onSelectRoleChangeHandler}
                >
                  <MenuItem value={"QA"}>QA</MenuItem>
                  <MenuItem value={"Developer"}>Developer</MenuItem>
                  <MenuItem value={"Teacher"}>Teacher</MenuItem>
                  <MenuItem value={"Police"}>Police</MenuItem>
                </Select>
              </Box>

              <Box
                justifyContent={"space-evenly"}
                flexDirection={"row"}
                display={"flex"}
              >
                <FormButton text="Save" onClicked={onSave} />
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
