import ButtonAppBar from "../AppBar";
import Wrapper from "../base/Wrapper";
import { Typography } from "@material-ui/core";

function Datenschutz() {
  return (
    <>
      <ButtonAppBar title="Datenschutz" />
      <Wrapper>
        {/* <IconButton>
          <MdArrowBack />
        </IconButton> */}

        <Typography variant="h2" component="h1">
          Datenschutzerklärung
        </Typography>
        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          §1 Information über die Erhebung personenbezogener Daten
        </Typography>

        <Typography>
          (1) Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung
          unserer Website. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar
          sind, z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten. <br />
          (2) Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DS-GVO) ist die
          Duale Hochschule Baden-Württemberg gesetzlich vertreten durch den Präsidenten der Dualen
          Hochschule Baden-Württemberg: <br />
          Präsident: Professor Arnold van Zyl
          <br />
          Friedrichstraße 14
          <br />
          70174 Stuttgart <br />
          Telefon 0711 / 320 660-0 <br />
          Telefax 0711 / 320 660-66 <br />
          <a href="mailto:poststelle@dhbw.de">poststelle(at)dhbw.de</a>
          <br />
          <a href="www.dhbw.de">www.dhbw.de</a>
          <br />
          <br />
          Unseren Datenschutzbeauftragten erreichen Sie unter unserer Postadresse mit dem Zusatz
          "der Datenschutzbeauftragte" oder unter: datenschutz[at]dhbw.de Die Verarbeitung dieser
          E-Mail-Adresse für Zwecke der Werbung oder der Markt- oder Meinungsforschung ist
          untersagt. <br />
          (3) Bei Ihrer Kontaktaufnahme mit uns per E-Mail oder über ein Kontaktformular werden die
          von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer)
          von uns gespeichert, um Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden
          Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die
          Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen. <br />
          (4) Falls wir für einzelne Funktionen unseres Angebots auf beauftragte Dienstleister
          zurückgreifen, werden wir Sie untenstehend im Detail über die jeweiligen Vorgänge
          informieren. Dabei nennen wir auch die festgelegten Kriterien der Speicherdauer.
        </Typography>

        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          §2 Ihre Rechte
        </Typography>

        <Typography>
          (1) Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
          personenbezogenen Daten:
        </Typography>
        <ul>
          <li>Recht auf Auskunft (Art. 15 DS-GVO)</li>
          <li>Recht auf Berichtigung oder Löschung (Art. 16 und 17 DS-GVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DS-GVO)</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DS-GVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DS-GVO)</li>
        </ul>
        <Typography>
          (2) Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
          Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DS-GVO).
          <br />
          <b>Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten</b>
          <br />
          (1) Falls Sie eine Einwilligung zur Verarbeitung Ihrer Daten erteilt haben, können Sie
          diese jederzeit widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit
          der auf Grund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.{" "}
          <br />
          (2) Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung
          gem. Art. 6 Abs. 1 S. 1 lit. f DS-GVO stützen, können Sie Widerspruch gegen die
          Verarbeitung einlegen. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der
          Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt
          verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und
          werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere
          zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung
          fortführen.
        </Typography>
        <Typography variant="h4" component="h2" style={{ marginTop: "8px" }}>
          §3 Erhebung personenbezogener Daten beim Besuch unserer Website
        </Typography>

        <Typography>
          (1) Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht
          registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die
          personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere
          Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch
          erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu
          gewährleisten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO):
        </Typography>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>Inhalt der Anforderung (konkrete Seite)</li>
          <li>Zugriffsstatus/HTTP-Statuscode</li>
          <li>jeweils übertragene Datenmenge</li>
          <li>Website, von der die Anforderung kommt</li>
          <li>Browsertyp und -version</li>
          <li>verwendetes Betriebssystem</li>
          <li>Spracheinstellungen</li>
        </ul>
        <Typography>
          Die vorstehenden Angaben werden für die Dauer von bis zu 4 Monate gespeichert und
          anschließend gelöscht oder wirksam anonymisiert. <br />
          (2) Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung unserer Website
          Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien,
          die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden
          und durch welche der Stelle, die den Cookie setzt (hier durch uns), bestimmte
          Informationen zufließen. <br />
          Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie
          dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.
          Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von
          Cookies ist Art. 6 Abs. 1 lit. f DS-GVO.
          <br />
          (3) Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige
          Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem
          Seitenwechsel identifiziert werden kann. In den Cookies werden dabei folgende Daten
          gespeichert und übermittelt:
        </Typography>
        <ul>
          <li>Information zur angemeldeten Person (im Falle eines Login)</li>
          <li>selbst gewählte Einstellungen (z.B. Schriftgröße)</li>
        </ul>
        <Typography>
          Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung
          von Nutzerprofilen verwendet. Eine dauerhafte Speicherung erfolgt nicht, die Cookies
          werden beim Schließen Ihres Browsers gelöscht (sogenannte Session Cookies).
          <br />
          (5) Wir verwenden auf unserer Website darüber hinaus Cookies, die eine Analyse des
          Surfverhaltens der Nutzer ermöglichen. Dies dient dem Zweck, die Qualität unserer Website
          und ihre Inhalte zu verbessern. Durch Analyse-Cookies erfahren wir, wie die Website
          genutzt wird und können so unser Angebot stetig optimieren.
          <br />
        </Typography>
      </Wrapper>
    </>
  );
}

export default Datenschutz;
