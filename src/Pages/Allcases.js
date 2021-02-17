import React, { Component } from "react";
import firebase from "../firebase";
import { Typography, CircularProgress, Box } from "@material-ui/core";
import { useHistory, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import css from "./mystyle.module.css";

class Allcases extends Component {
  constructor(props) {
    super(props);
    let date = "ll";

    this.state = {
      studentslist: [],
      loaded: false,
      normal: [],
      critical: [],
      show_progress: true,
    };
    function Allcases(params) {
      let location = useLocation();
      date = location.allProps.date;
    }
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("hitman")

      .on("value", (snapshot) => {
        let studentlist = [];
        snapshot.forEach((snap) => {
          // snap.val() is the dictionary with all your keys/values from the 'students-list' path
          studentlist.push(snap.val());
        });
        this.setState({ studentslist: studentlist });

        if (this.state.studentslist != null) {
          this.setState({ loaded: true });
        }
      });
  }

  render() {
    let countall = 0;
    let countcrt = 0;
    let count = 0;
    return (
      <div className="MainDiv">
        <div class="jumbotron text-center bg-sky">
          <h3>{sessionStorage.getItem("date")}</h3>
        </div>

        <div className="container">
          <table id="example" class="display table">
            <thead class="thead-dark">
              <tr>
                <th>EID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Remark</th>
                <th>Inspect</th>
              </tr>
            </thead>

            <tbody>
              {this.state.loaded
                ? this.state.studentslist.map((data, key) => {
                    count++;
                    if (
                      sessionStorage.getItem("button") == "all" &&
                      this.state.studentslist != null
                    ) {
                      countall++;
                      return (
                        <tr>
                          <td>{data["personal"]["EID"]}</td>
                          <td>{data["personal"]["name"]}</td>
                          <td>{data["personal"]["email"]}</td>
                          <td>{data["personal"]["phone"]}</td>

                          {data["personal"]["remark"] == "normal" ? (
                            <td>{data["personal"]["remark"]}</td>
                          ) : (
                            <td className={css.redcolor}>
                              {data["personal"]["remark"]}
                            </td>
                          )}

                          <NavLink
                            onClick={() =>
                              sessionStorage.setItem(
                                "uid",
                                data["personal"]["uid"],
                                sessionStorage.setItem(
                                  "info",
                                  JSON.stringify(data["personal"])
                                )
                              )
                            }
                            to={{
                              pathname: "/healthDetails",
                              allProps: {
                                personal: data["personal"],
                                health: data["health"],
                              },
                            }}
                          >
                            <td>View</td>
                          </NavLink>
                        </tr>
                      );
                    }
                    if (
                      data["personal"]["remark"] == "critical" &&
                      sessionStorage.getItem("button") == "critical" &&
                      this.state.studentslist != null
                    ) {
                      countcrt++;
                      return (
                        <tr>
                          <td>{data["personal"]["name"]}</td>
                          <td>{data["personal"]["email"]}</td>
                          <td>{data["personal"]["email"]}</td>
                          <td>{data["personal"]["phone"]}</td>
                          <td className={css.redcolor}>
                            {data["personal"]["remark"]}
                          </td>
                          <NavLink
                            onClick={
                              (() =>
                                sessionStorage.setItem(
                                  "wifi",
                                  data["personal"]["wifi"]
                                ),
                              sessionStorage.setItem(
                                "info",
                                JSON.stringify(data["personal"])
                              ))
                            }
                            to={{
                              pathname: "/healthDetails",
                              allProps: {
                                personal: data["personal"],
                                health: data["health"],
                              },
                            }}
                          >
                            <td>View</td>
                          </NavLink>
                        </tr>
                      );
                    }
                    if (
                      sessionStorage.getItem("button") == "critical" &&
                      countcrt == 0 &&
                      count == this.state.studentslist.length
                    ) {
                      countcrt++;
                      return (
                        <div>
                          <h3 class="jumbotron text-center bg-warning">
                            All Are good :) No Critical Data Found
                          </h3>
                        </div>
                      );
                    }
                    if (
                      sessionStorage.getItem("button") == "all" &&
                      countall == 0
                    ) {
                      countall++;
                      return (
                        <div>
                          <h3 class="jumbotron text-center bg-warning">
                            Data Is Not Available :)
                          </h3>
                        </div>
                      );
                    }
                  })
                : null}
            </tbody>
          </table>
          <Box class="d-flex justify-content-center">
            {!this.state.loaded ? (
              <CircularProgress size={50} color="primary" thickness={4} />
            ) : null}
          </Box>
        </div>
      </div>
    );
  }
}

export default Allcases;
