import React, { Component } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { firestore, firebaseAuth } from "../firebase";
import logo from "../Media/helthmonitor.png";

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      show_progress: false,
    };
    this.handleChange = this.handleChange.bind();
    this.login = this.login.bind();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  login = () => {
    let valid_data = true;
    this.state.email_error = null;
    this.state.password_error = null;
    if (this.state.email === "") {
      this.state.email_error = "Required!";
      valid_data = false;
    }
    if (this.state.password === "") {
      this.state.password_error = "Required!";
      valid_data = false;
    }
    if (valid_data) {
      this.state.show_progress = true;
    }

    this.setState({
      update: true,
    });
    if (valid_data) {
      //login
      firestore
        .collection("users")
        .where("email", "==", this.state.email)
        .where("isAdmin", "==", true)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            //login
            firebaseAuth
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then((res) => {
                console.log("true");
                this.props.history.replace("/");
              })
              .catch((err) => {
                if (err.code === "auth/wrong-password") {
                  this.state.password_error = "Incorrect Password!";
                }

                this.setState({
                  show_progress: false,
                });
              });
          } else {
            this.state.email_error = "Not Allowd";
            this.setState({
              show_progress: false,
            });
          }
        });
    }
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Box
          bgcolor="white"
          textAlign="center"
          p="24px"
          boxShadow="2"
          borderRadius="12px"
          mt="50px"
        >
          <img src={logo} height="50px" />
          <Typography color="textSecondary"> ADMIN</Typography>
          <TextField
            label="Email"
            id="outlined-size-small"
            fullWidth
            variant="outlined"
            color="secondary"
            size="small"
            name="email"
            error={this.state.email_error != null}
            helperText={this.state.email_error}
            onChange={this.handleChange}
            margin="normal"
            textAlign="center"
          />
          <TextField
            label="Password"
            id="outlined-size-small"
            fullWidth
            variant="outlined"
            size="small"
            margin="normal"
            textAlign="center"
            type="password"
            name="password"
            error={this.state.password_error != null}
            helperText={this.state.password_error}
            onChange={this.handleChange}
            color="secondary"
          />
          <br />
          <br />
          {this.state.show_progress ? (
            <CircularProgress size={25} color="primary" thickness={4} />
          ) : null}
          <br />
          <br />
          <Button
            disableElevation
            fullWidthg
            onClick={this.login}
            variant="contained"
            color="primary"
          >
            LOGIN
          </Button>
        </Box>
      </Container>
    );
  }
}

export default login;
