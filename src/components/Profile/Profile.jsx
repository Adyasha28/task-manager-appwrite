import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLLECTION_ID, DATABASE_ID } from "../../appwrite/constants";
import { account, databases } from "../../appwrite/config";
import TaskForm from "../TaskForm";
import { Query } from "appwrite";
import AllTask from "../AllTask";

const Profile = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [userDetails, setuserDetails] = useState();
  const [showForm, setshowForm] = useState(false);

  const [activeClass, setactiveClass] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const toggleCompleted = (task) => {
    const promise = databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      task.$id,
      {
        completed: !task.completed,
      }
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        fetchTasks();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const deleteTask = (task) => {
    const promise = databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      task.$id
    );

    promise.then(
      async function (response) {
        console.log(response); // Success
        fetchTasks(
          Object.keys(activeClass).find((key) => activeClass[key] === true)[0]
        );
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const changeActiveClass = (type) => {
    setactiveClass({
      all: false,
      active: false,
      completed: false,
      [type]: true,
    });
    fetchTasks(type);
  };

  const clearCompleted = () => {
    tasks.filter((task) => task.isCompleted).map((task) => deleteTask(task));
  };

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log(res);
        setuserDetails(res);
      },
      (error) => {
        console.log(error);
        navigate("/");
      }
    );
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [userDetails]);

  const handleLogout = () => {
    account.deleteSession("current").then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    navigate("/");
  };

  const fetchTasks = async (type = "all") => {
    //queries in apprwrite helps to filter personalised tasks for each user, eg:authorization and authentication
    let promise;
    if (type === "all") {
      promise = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("uid", [userDetails?.$id]),
        Query.orderDesc("$updatedAt"), //all tasks are arranged in desc order
      ]);
    } else if (type === "active") {
      promise = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("uid", [userDetails?.$id]),
        Query.orderDesc("$updatedAt"),
        Query.equal("isCompleted", [false]), //here query is given
      ]);
    } else {
      promise = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("uid", [userDetails?.$id]),
        Query.orderDesc("$updatedAt"),
        Query.equal("isCompleted", [true]), //completed query is given here
      ]);
    }

    promise.then(
      function (response) {
        setTasks(response.documents);
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="min-h-[100vh] bg-bg-dark ">
      {/* FORM MODAL */}
      {showForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          setshowForm={setshowForm}
          user={userDetails}
        />
      )}

      <div className="topDiv bg-bg-desktop-dark w-full min-h-[35vh] bg-no-repeat bg-cover flex justify-between items-center">
        <nav className="topDiv_nav flex justify-between items-center w-[45%] m-auto">
          <header
            className=" text-5xl tracking-widest font-semibold"
            style={{ color: "#fff" }}
          >
            Task Manager
          </header>
          <div className="right flex items-center gap-5 w-1/7">
            {/* <div className="toggle flex items-center justify-center hover:cursor-pointer">
                        <img src={Sun} alt="toggle site theme between night/light" />
                    </div> */}

            <button
              className="first-letter bg-transparent font-bold border-2 text-lg p-1 px-2 text-white duration-200 hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
      {userDetails ? (
        <div className="task_container w-3/4 m-auto flex flex-col items-center justify-center -mt-10">
          <div
            className="w-3/5 -mt-10 mb-10 flex items-center justify-between py-4 px-3 bg-list-dark duration-300 hover:scale-[1.02]"
            onClick={() => setshowForm(true)}
          >
            <div className="leftListItem flex items-center gap-5">
              <div
                className={`border-2 border-list-font-dark rounded-full p-1 flex items-center justify-center min-w-[15px] min-h-[15px] hover:cursor-pointer`}
              ></div>
              <p className={`text-lg text-list-font-dark font-semibold`}>
                Start writing...
              </p>
            </div>
          </div>
          <AllTask fetchTasks={fetchTasks} tasks={tasks} />
          {tasks.length && (
            <footer className="flex w-3/5 items-center justify-between py-5 px-3 bg-list-dark text-white">
              <div className="leftSifeFooter text-list-font-dark font-semibold">
                {tasks.length} items left
              </div>
              <ul className="centerSideFooter flex items-center gap-4 font-semibold text-sm">
                <li
                  className={`hover:cursor-pointer ${
                    activeClass.all && "text-color-blue"
                  }`}
                  onClick={() => changeActiveClass("all")}
                >
                  All
                </li>
                <li
                  className={`hover:cursor-pointer ${
                    activeClass.active && "text-color-blue"
                  }`}
                  onClick={() => changeActiveClass("active")}
                >
                  Active
                </li>
                <li
                  className={`hover:cursor-pointer ${
                    activeClass.completed && "text-color-blue"
                  }`}
                  onClick={() => changeActiveClass("completed")}
                >
                  Completed
                </li>
              </ul>
              <div
                className="rightSideFooter hover:cursor-pointer"
                onClick={clearCompleted}
              >
                Clear Completed
              </div>
            </footer>
          )}
        </div>
      ) : (
        <>
          <p className="mt-4">
            Please Login To see Profile{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              <span className="bg-blue-300 p-2 cursor-pointer text-white">
                Login
              </span>
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
