import React from "react";
import firebase from "../firebase";

//Calling Bootstrap 4.5 css
import "bootstrap/dist/css/bootstrap.min.css";
import css from "./mystyle.module.css";
import { Box } from "@material-ui/core";

//Calling Firebase config setting to call the data

class healthDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { studentslist: [], encrypt_value: [], encrypt_key: [] };
    this.decrypt = this.decrypt.bind(this);
  }

  componentDidMount() {
    let id =
      "hitman/" +
      sessionStorage.getItem("uid") +
      "/health/" +
      sessionStorage.getItem("date");

    firebase
      .database()
      .ref(id)
      .orderByKey()
      .on("value", (snapshot) => {
        let studentlist = [];
        snapshot.forEach((snap) => {
          // snap.val() is the dictionary with all your keys/values from the 'students-list' path
          studentlist.push(snap.val());
        });
        this.setState({ studentslist: studentlist });
        console.log(sessionStorage.getItem("info"));
      });
  }
  decrypt(props) {
    var integer_value = parseInt(props);
    var key = integer_value % 10;
    var value = parseInt(integer_value / 100);

    switch (key) {
      case 0:
        for (var num = 5; num < 500; num++) {
          if (num * num - num - 10 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 1:
        for (var num = 5; num < 500; num++) {
          if (num * num - num * 2 - 1 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 2:
        for (var num = 0; num < 5000; num++) {
          if (num * num - num - 1 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 3:
        for (var num = 0; num < 5000; num++) {
          if (num * 3 * num - num - 1 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 4:
        for (var num = 0; num < 5000; num++) {
          if (100 * num - num - 1 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 5:
        for (var num = 0; num < 5000; num++) {
          if (num * num - num + 86 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 6:
        for (var num = 5; num < 500; num++) {
          if (num * num - num - 1 + num * 3 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 7:
        for (var num = 5; num < 500; num++) {
          if (num * num - num - 2 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 8:
        for (var num = 5; num < 500; num++) {
          if (num * num - num - 3 == value) {
            return num.toString();
            break;
          }
        }

        break;
      case 9:
        for (var num = 5; num < 500; num++) {
          if (num * num - num - 4 == value) {
            return num.toString();
            break;
          }
        }

        break;
      default:
        return value.toString();
    }
  }

  render() {
    const obj = JSON.parse(sessionStorage.getItem("info"));
    console.log(obj);
    var bp_array;
    var value_ = "";

    return (
      <div className="MainDiv">
        <br></br>
        <Box class="d-flex justify-content-around">
          <img
            style={{ width: 150 }}
            src={obj.profile_image}
            alt="..."
            class="rounded float-left"
          ></img>

          <Box>
            <div class="d-flex flex-column">
              <div class="p-2">
                <div class="font-weight-bold">EID : {obj.EID}</div>{" "}
              </div>
              <div class="p-2">Name : {obj.name}</div>
              <div class="p-2">Email : {obj.email}</div>
              <div class="p-2">Phone : {obj.phone}</div>
            </div>
          </Box>
          <Box>
            <div class="d-flex flex-column">
              <div class="p-2">Blood Group : {obj.blood_group}</div>
              <div class="p-2">Birth Date : {obj.birth_date}</div>
              <div class="p-2">Weight : {obj.weight} kgs</div>
              <div class="p-2">Height : {obj.height} cm</div>
            </div>
          </Box>
        </Box>

        <div class="d-flex justify-content-around">
          <p class="font-weight-bold">
            {" "}
            {"Analysis for " + sessionStorage.getItem("date")}
          </p>
        </div>

        <div className="container">
          <table id="example" class="display table">
            <thead class="thead-dark">
              <tr>
                <th>Time</th>
                <th>Temperature (Celsius)</th>
                <th>Blood Pressure (mmHg)</th>
                <th>Sugar Level (mg/dl)</th>
                <th>Heamoglobin (g/dl)</th>
                <th>Heart Rate (BPM)</th>
                <th>Conclusion</th>
              </tr>
            </thead>
            <tbody>
              {this.state.studentslist.reverse().map((data) => {
                {
                  bp_array = data.blood_pressure.split("/");
                }
                return data.remark == "normal" ? (
                  <tr>
                    {}
                    <td>{data.time}</td>
                    <td>{this.decrypt(data.temp)}</td>
                    <td>
                      {(bp_array = data.blood_pressure.split("/"))}
                      {this.decrypt(bp_array[0])}/{this.decrypt(bp_array[1])}
                    </td>
                    <td>{this.decrypt(data.sugar)}</td>
                    <td>{this.decrypt(data.hb)}</td>
                    <td>{this.decrypt(data.bps)}</td>
                    <td>{data.conclusion}</td>
                  </tr>
                ) : (
                  <tr className={css.redcolor}>
                    <td>{data.time}</td>
                    <td>{this.decrypt(data.temp)}</td>
                    <td>
                      {this.decrypt(bp_array[0])}/{this.decrypt(bp_array[1])}
                    </td>
                    <td>{this.decrypt(data.sugar)}</td>
                    <td>{this.decrypt(data.hb)}</td>
                    <td>{this.decrypt(data.bps)}</td>
                    <td>{data.conclusion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default healthDetails;
