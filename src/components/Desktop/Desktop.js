import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { AiFillHeart } from "react-icons/ai";
import HeroImage from "../../media/hero-image.jpeg";
import Calendar from "../../media/calendar.png";
import Finance from "../../media/finance.png";
import Todo from "../../media/todo.png";
import Shopping from "../../media/shopping.png";
import Cleaning from "../../media/cleaning.png";
import Movie from "../../media/movie.png";
import { Link } from "@reach/router";
import DesktopNavbar from "./DesktopNavbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  heroContent: {
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.common.white,
  },
  blur: {
    padding: theme.spacing(15, 0, 6),
    backdropFilter: "blur(5px)",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  links: {
    paddingLeft: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default function Album() {
  const classes = useStyles();

  function CardFeature(props) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={props.image} />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography>{props.text}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DesktopNavbar />
      <main>
        <div className={classes.heroContent}>
          <div className={classes.blur}>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={7} md={6}>
                  <Typography component="h1" variant="h1" gutterBottom>
                    Zusammen einfacher planen
                  </Typography>
                  <Typography component="h2" variant="h4" paragraph>
                    Das Planen im Freundeskreis oder mit der Familie ist meist mühselig. Mit GrouBee
                    wird das Organisieren und Planen verschiedener Alltagssituationen zum
                    Kinderspiel.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h4" color="primary" paragraph>
                Du hast die App noch nicht?
              </Typography>
              <Typography variant="h5" color="primary" paragraph>
                Öffne diese Website auf deinem Smartphone, füge die PWA deinem Home Bildschirm hinzu
                und nutze eines der vielen Features:
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <CardFeature
              title="Kalender"
              text="Der Kalender bietet dir die Möglichkeit, dass du alle wichtigen Gruppentermine im Blick behältst."
              image={Calendar}
            />
            <CardFeature
              title="Finanzen"
              text="Mit dem Modul Finanzen vergesst ihr nie, wer noch wem etwas schuldet."
              image={Finance}
            />
            <CardFeature
              title="ToDos"
              text="Nie wieder ein To-do vergessen. Haltet eure offenen Tätigkeiten in einer To-do-Liste fest."
              image={Todo}
            />
            <CardFeature
              title="Einkaufen"
              text="Schon wieder etwas beim Einkaufen vergessen? GrouBee bietet eine gemeinsame Einkaufsliste."
              image={Shopping}
            />
            <CardFeature
              title="Putzen"
              text="Putzen macht kein Spaß. Es ist aber entspannter, wenn jeder weiß, was zu tun ist."
              image={Cleaning}
            />
            <CardFeature
              title="Filme/Serien"
              text="Welche Serie wollten wir schauen? Behaltet den Überblick über eure Fernsehabende."
              image={Movie}
            />
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          GrouBee
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made with <AiFillHeart /> Jana, Lea, Nils, Natascha, Felix, Ole
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          DHBW Mosbach, Onlinemedien
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.links}>
          <Link to="/impressum" className={classes.link}>
            Impressum
          </Link>{" "}
          |{" "}
          <Link to="/datenschutz" className={classes.link}>
            Datenschutz
          </Link>
        </Typography>
      </footer>
    </div>
  );
}
