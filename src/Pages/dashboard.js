import { Typography, Button } from "@material-ui/core";
import styles from "./mystyle.module.css";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Allcases from "./Allcases";
import { useHistory, NavLink } from "react-router-dom";
import dateformat from "dateformat";
import Allcasess from "./Allcases";
import firebase from "../firebase";

import React, { Component, useState } from "react";
import PropTypes from "prop-types";

export class dashboard extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      studentslist: [],
      sDate: date,
      pres: [],
    };
  }

  render() {
    if (this.state.sDate > new Date()) {
      alert("date should not exide than today");
      this.setState({ sDate: new Date() });
    }
    sessionStorage.setItem(
      "date",
      dateformat(this.state.sDate.toString(), "dd-mm-yyyy")
    );

    return (
      <div>
        <div class="jumbotron text-center bg-warning">
          <h3>TATA CUNSULTANCY SERVICES</h3>
          <h2>welcome admin</h2>

          <DatePicker
            className={styles.datep}
            selected={this.state.sDate}
            onChange={(date) => this.setState({ sDate: date })}
          />
        </div>

        <div>
          <div class="jumbotron text-center bg-red">
            <NavLink
              class="btn btn-danger btn-lg"
              onClick={() => sessionStorage.setItem("button", "critical")}
              to={{
                pathname: "/allcases",

                aboutProps: {
                  date: dateformat(this.state.sDate.toString(), "dd-mm-yyyy"),
                  button: "critical",
                },
              }}
            >
              Critical Cases
            </NavLink>
            <p> </p>
            <NavLink
              class="btn btn-primary btn-lg"
              onClick={() => sessionStorage.setItem("button", "all")}
              to={{
                pathname: "/allcases",
                aboutProps: {
                  date: dateformat(this.state.sDate, "dd-mm-yyyy"),
                  button: "all",
                  // allusers: array2,
                },
              }}
            >
              All Cases
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
