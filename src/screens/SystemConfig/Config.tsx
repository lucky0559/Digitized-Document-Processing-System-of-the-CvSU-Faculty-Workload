import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { YearRangePicker } from "react-year-range-picker";
import styled from "styled-components";
import FormButton from "../../components/FormButton";
import Menu from "../../components/Menu";
import ScreenTitle from "../../components/ScreenTitle";
import TopNav from "../../components/TopNav";
import { User } from "../../types/User";
import { GetAllUser } from "../../lib/user.hooks";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Colors from "../../constants/Colors";
import ProfileTab from "../../components/ProfileTab";
import { CONFIG } from "../../enums/ConfigEnums";
import { Semester } from "../../constants/Strings";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  getConfig,
  updateHourlyRate,
  updateSchoolYear,
  updateSemester,
  updateSubmissionRange
} from "../../lib/config.hooks";
import { Config } from "../../types/Config";

type AccountsScreenProps = {
  UseLogout: () => void;
};

type yearProps = {
  startYear: number;
  endYear: number;
};

const ConfigScreen = ({ UseLogout }: AccountsScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [users, setUsers] = useState<User[]>();

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [semester, setSemester] = useState("");
  const [schoolYear, setSchoolYear] = useState<yearProps>();
  const [submissionRange, setSubmissionRange] = useState<Date[] | undefined>();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  const [hourlyRate, setHourlyRate] = useState<number>();

  const [editing, setEditing] = useState<number>();

  const [config, setConfig] = useState<Config>();

  const [isRefetching, setIsRefetching] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStartEndSameDayDate =
    selectionRange.startDate.getFullYear() === new Date().getFullYear() &&
    selectionRange.startDate.getMonth() === new Date().getMonth() &&
    selectionRange.startDate.getDate() === new Date().getDate() &&
    selectionRange.endDate.getFullYear() === new Date().getFullYear() &&
    selectionRange.endDate.getMonth() === new Date().getMonth() &&
    selectionRange.endDate.getDate() === new Date().getDate();

  useEffect(() => {
    if (!isRefetching) {
      (async () => {
        const { data } = await getConfig();
        setConfig(data);
      })();
      setIsRefetching(true);
    }
  }, [isRefetching]);

  useEffect(() => {
    (async () => {
      const { data } = await GetAllUser();
      setUsers(data as User[]);
    })();
  }, [isModalOpen]);

  useEffect(() => {
    if (users) {
      setIsDataLoading(false);
    } else {
      setIsDataLoading(true);
    }
  }, [users]);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const onOpenModal = (prop: number) => {
    switch (prop) {
      case CONFIG.SEMESTER:
        setEditing(CONFIG.SEMESTER);
        setIsModalOpen(true);
        break;
      case CONFIG.SCHOOL_YEAR:
        setEditing(CONFIG.SCHOOL_YEAR);
        setIsModalOpen(true);
        break;
      case CONFIG.DATE_RANGE:
        setEditing(CONFIG.DATE_RANGE);
        setIsModalOpen(true);
        break;
      case CONFIG.HOURLY_RATE:
        setEditing(CONFIG.HOURLY_RATE);
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSubmissionRange([selectionRange.startDate, selectionRange.endDate]);
  }, [selectionRange]);

  const onCloseModal = () => {
    setSemester("");
    setSchoolYear(undefined);
    setSubmissionRange(undefined);
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    });
    setHourlyRate(undefined);
    setEditing(undefined);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const onSubmitHandler = async (prop: number | undefined) => {
    setIsSubmitting(true);
    switch (prop) {
      case CONFIG.SEMESTER:
        await updateSemester(semester);
        break;
      case CONFIG.SCHOOL_YEAR:
        await updateSchoolYear(schoolYear?.startYear!, schoolYear?.endYear!);
        break;
      case CONFIG.DATE_RANGE:
        await updateSubmissionRange(submissionRange![0], submissionRange![1]);
        break;
      case CONFIG.HOURLY_RATE:
        await updateHourlyRate(hourlyRate!);
        break;
      default:
        break;
    }
    setIsSubmitting(false);
    onCloseModal();
    setIsRefetching(false);
  };

  return (
    <MainContainer>
      <TopNav profileHandler={() => setIsProfileOpen(!isProfileOpen)} />
      <div
        style={{ display: "flex", flexDirection: "row", position: "relative" }}
      >
        <div style={{ minHeight: "100vh" }}>
          <Menu position="relative" />
        </div>
        <ProfileTab
          isProfileOpen={isProfileOpen}
          UseLogout={UseLogout}
          isAdmin={true}
        />
        {!config || !isRefetching ? (
          <div
            style={{
              display: "flex",
              marginTop: 500,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <LoadingSpinner color={Colors.primary} />
          </div>
        ) : (
          <BodyContainer>
            <ScreenTitle title="Configuration" />
            <Modal open={isModalOpen}>
              <Box sx={modalStyle}>
                <div className="flex flex-row mb-7">
                  {editing === CONFIG.SEMESTER ? (
                    <>
                      <span className="font-bold">Semester: </span>
                      <select
                        className="ml-3"
                        onChange={e => setSemester(e.target.value)}
                      >
                        {Semester.map(sem => (
                          <option
                            value={sem}
                            selected={config.semester === sem}
                            defaultValue={config.semester}
                          >
                            {sem}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : editing === CONFIG.SCHOOL_YEAR ? (
                    <>
                      <span className="font-bold">School Year: </span>
                      <div className="ml-5">
                        <YearRangePicker
                          minYear={new Date().getFullYear() - 3}
                          maxYear={new Date().getFullYear() + 3}
                          onSelect={(startYear, endYear) =>
                            setSchoolYear({
                              startYear,
                              endYear
                            })
                          }
                          startYear={schoolYear?.startYear}
                          endYear={schoolYear?.endYear}
                        />
                      </div>
                    </>
                  ) : editing === CONFIG.DATE_RANGE ? (
                    <>
                      <span className="font-bold mr-4">Date Range: </span>
                      <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={({ selection }) => {
                          setSelectionRange({
                            startDate: selection.startDate!,
                            endDate: selection.endDate!,
                            key: selection.key!
                          });
                        }}
                        staticRanges={[]}
                        inputRanges={[]}
                      />
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Hourly Rate: </span>
                      <input
                        onChange={e => setHourlyRate(Number(e.target.value))}
                        type="number"
                        min={0}
                        className="border rounded border-black ml-4 p-1"
                      />
                    </>
                  )}
                </div>
                <div className="flex justify-between">
                  <FormButton text="Close" onClicked={onCloseModal} />
                  <FormButton
                    text="Save"
                    onClicked={() => onSubmitHandler(editing)}
                    disabled={
                      !semester &&
                      !schoolYear &&
                      isStartEndSameDayDate &&
                      !hourlyRate
                    }
                    isSubmitting={isSubmitting}
                  />
                </div>
              </Box>
            </Modal>
            <div className="p-12">
              <div className="flex flex-row">
                <span className="font-bold">Semester: </span>
                <span className="ml-2">{config?.semester}</span>
                <div className="ml-5">
                  <span
                    className="cursor-pointer hover:opacity-70 underline"
                    onClick={() => onOpenModal(CONFIG.SEMESTER)}
                  >
                    Edit
                  </span>
                </div>
              </div>
              <div className="flex flex-row">
                <span className="font-bold">School Year: </span>
                <span className="ml-2">
                  {config?.schoolYearStart} - {config?.schoolYearEnd}
                </span>
                <div className="ml-5">
                  <span
                    className="cursor-pointer hover:opacity-70 underline"
                    onClick={() => onOpenModal(CONFIG.SCHOOL_YEAR)}
                  >
                    Edit
                  </span>
                </div>
              </div>
              <div className="flex flex-row">
                <span className="font-bold">Date Range: </span>
                <span className="ml-2">
                  {new Date(config?.submissionDateStart).toDateString()} -{" "}
                  {new Date(config?.submissionDateEnd).toDateString()}
                </span>
                <div className="ml-5">
                  <span
                    className="cursor-pointer hover:opacity-70 underline"
                    onClick={() => onOpenModal(CONFIG.DATE_RANGE)}
                  >
                    Edit
                  </span>
                </div>
              </div>
              <div className="flex flex-row">
                <span className="font-bold">Hourly Rate: </span>
                <span className="ml-2">{config?.hourlyRate}</span>
                <div className="ml-5">
                  <span
                    className="cursor-pointer hover:opacity-70 underline"
                    onClick={() => onOpenModal(CONFIG.HOURLY_RATE)}
                  >
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </BodyContainer>
        )}
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

export default ConfigScreen;
