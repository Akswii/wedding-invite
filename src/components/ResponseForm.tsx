import { useRef } from "react";
import { Container } from "./Container";
import emailjs from "@emailjs/browser";
import cupid from "../assets/cupid.svg";

export const ResponseForm = () => {
  const form = useRef(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    emailjs
      .sendForm("service_7ci9mvl", "YOUR_TEMPLATE_ID", (form as any).current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <Container
      align="left"
      style={{
        padding: "0 5rem",
        justifyContent: "flex-start",
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ marginBottom: 0 }}>Kjem du?</h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="fontTest"
        >
          <p>Svarfrist: 13. mai</p>
          <label className="radio">
            <input type="radio" name="response" value="ja" /> Ja, jeg kommer!
          </label>
          <label className="radio" style={{ display: "flex", gap: ".5rem" }}>
            <input type="radio" name="response" value="nei" /> Nei, jeg kan
            dessverre ikke komme.
          </label>
          <label>
            <span>Navn</span>
            <input type="text" name="Navn" placeholder="Anna Wiig" />
          </label>
          <label>
            <span>Telefonnummer</span>
            <input type="text" name="tlf" placeholder="XXX XX XXX" />
          </label>
          <label>
            Allergier
            <input
              type="text"
              name="allergier"
              placeholder="Gluten, laktose..."
            />
          </label>
          <button
            type="button"
            style={{
              cursor: "pointer",
              alignSelf: "flex-start",
              border: "2px solid var(--fontColor)",
              color: "var(--fontColor)",
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: "5rem",
              padding: "0.5rem 1.5rem",
              fontSize: "24px",
            }}
          >
            Send inn
          </button>
        </form>
      </div>
      <img
        src={cupid.src}
        style={{
          marginTop: "7rem",
          alignSelf: "center",
          height: "15rem",
          width: "15rem",
        }}
      />
    </Container>
  );
};
