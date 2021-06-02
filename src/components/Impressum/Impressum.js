import ButtonAppBar from "../AppBar";
import Wrapper from "../base/Wrapper";
import { Typography } from "@material-ui/core";
import { Link } from "@material-ui/core";

function Impressum() {
  return (
    <>
      <ButtonAppBar title="Impressum" />

      <Wrapper>
        <Typography variant="h2" component="h1">
          Impressum
        </Typography>

        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          Herausgeber
        </Typography>
        <Typography>
          Duale Hochschule Baden-Württemberg
          <br />
          Präsident: Professor Arnold van Zyl
        </Typography>
        <Typography>
          Friedrichstraße 14
          <br />
          70174 Stuttgart
        </Typography>
        <Typography>
          Telefon 0711 / 320 660-0
          <br />
          Telefax 0711 / 320 660-66
          <br />
          <Link href="mailto:poststelle@dhbw.de" color="primary">
            poststelle@dhbw.de
          </Link>
          <br />
          <Link href="https://www.dhbw.de" color="primary">
            www.dhbw.de
          </Link>
        </Typography>
        <br />
        <Typography variant="h2" component="h2">
          Rechtliches
        </Typography>

        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          Haftungsausschluss
        </Typography>
        <Typography>
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Die
          Duale Hochschule Baden-Württemberg Mosbach behält sich das Recht vor, ohne vorherige
          Ankündigung, Änderungen oder Ergänzungen der bereitgestellten Informationen vorzunehmen.
          <br />
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
          ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei bekannt
          werden von Rechtsverletzungen werden wir derartige Links umgehend entfernen. <br />
          Die Duale Hochschule Baden-Württemberg Mosbach begründet durch die Bereitstellung dieser
          Informationen kein Vertragsangebot über Auskünfte, Beratung oder ähnliche
          Vertragsbeziehungen. Jegliche Haftung für die Nutzung der Inhalte der Web Site oder die
          Richtigkeit der Inhalte oder die Erreichbarkeit der Web Site wird ausgeschlossen. Die
          Duale Hochschule Baden-Württemberg Mosbach haftet daher nicht für konkrete, mittelbare und
          unmittelbare Schäden oder Schäden, die durch fehlende Nutzungsmöglichkeiten, Datenverluste
          oder entgangene Gewinne entstehen können, die im Zusammenhang mit der Nutzung von
          Dokumenten oder Informationen entstehen, die auf dieser Website zugänglich sind.
        </Typography>

        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          Urheberrecht
        </Typography>
        <Typography>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
          bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
          kommerziellen Gebrauch gestattet.
        </Typography>
      </Wrapper>
    </>
  );
}

export default Impressum;
