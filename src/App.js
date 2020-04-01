import React from "react";
import "./styles.css";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import MenuIcon from "@material-ui/icons/Menu";

import Box from "@material-ui/core/Box";
import styled from "styled-components";
import Paletts from "./Pallets";
import { DELIVERY } from "./data";
import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Container,
  FormControl,
  Select,
  Input,
  MenuItem,
  Paper,
  Grid,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { EURO, INDUSTRY } from "./constants";
import { useEffect } from "react";
import { copy } from "./helper";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem"
  }
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ marginBottom: "3rem" }}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          TOUR ERSTELLEN
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default function App() {
  const [delivery, setDelivery] = useState([]);
  const [counter, incrCounter] = useState(0);
  const [rerender, setRerender] = useState();

  console.log("deliver", delivery);

  return (
    <div className="App">
      <Nav />
      <Control incrCounter={incrCounter} counter={counter} />
      <OrderForm delivery={delivery} setDelivery={setDelivery} />

      {delivery.length > 0 && (
        <Paletts delivery={delivery} />
        // <Paletts delivery={delivery[counter % delivery.length]} />
      )}
    </div>
  );
}
const Control = ({ incrCounter, counter }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3">TOUR ALGORITHMUS</Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={() => incrCounter(++counter)}
      >
        Auftrag Generieren
      </Button>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={() => incrCounter(++counter)}
      >
        Auftrag Eingeben
      </Button>
    </>
  );
};

const products = [
  { name: "Polykanister ", id: 1 },
  { name: "Flachkannen", id: 2 },
  { name: "F2 Karton", id: 3 }
];

const buildungs = [
  { name: "G20", id: 1, building: 1 },
  { name: "E30", id: 2, building: 1 },
  { name: "A222", id: 3, building: 2 }
];
// { id: 1, type: EURO, product: "x", quantity: 12, factory: 1 },
// { id: 2, type: EURO, product: "x", quantity: 6, factory: 1 },

function getStyles(name, personName, theme) {
  if (!personName) {
    return { fontWeight: theme.typography.fontWeightRegular };
  }
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const OrderForm = ({ delivery, setDelivery }) => {
  const classes = useStyles();
  const [product, setProduct] = useState("");
  const [building, setBuildung] = useState("");
  const [quantity, setQuantity] = useState("");

  const addOrderElement = () => {
    console.log("Add", product, building, quantity);
    var delivery_ = copy(delivery);

    delivery_.push({
      id: delivery.length + 1,
      type: product.id % 2 === 0 ? EURO : INDUSTRY,
      product: product.name,
      quantity: parseInt(quantity),
      factory: building.building,
      building: building.name
    });
    setDelivery(delivery_);
    console.log("done...");
  };

  return (
    <>
      <Container maxWidth="md">
        <FormContainer>
          <FormElement>
            <InputLabel id="demo-mutiple-name-label">Produkt</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              value={product.name}
              onChange={e => setProduct(e.target.value)}
              input={<Input />}
              fullWidth
            >
              {products.map(name => (
                <MenuItem key={name.id} value={name}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormElement>
          <FormElement>
            <InputLabel id="demo-mutiple-name-label">Gebäude</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              value={building.name}
              onChange={e => setBuildung(e.target.value)}
              input={<Input />}
              fullWidth
            >
              {buildungs.map(name => (
                <MenuItem key={name.id} value={name}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormElement>
          <FormElement>
            <TextField
              id="standard-number"
              label="Anzahl"
              type="number"
              variant="outlined"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormElement>
          <FormElement>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              size="small"
              onClick={addOrderElement}
            >
              Auftrag Eingeben
            </Button>
          </FormElement>
        </FormContainer>
      </Container>
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-basis: 20%;
  margin: 3rem;
`;

const FormElement = styled.div`
  width: 20%;
`;
