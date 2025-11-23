import { useRef } from "react";
import { Container } from "./Container";
import emailjs from "@emailjs/browser";
import cupid from "../assets/cupid.svg";

export const ResponseForm = () => {
  const form = useRef(null);

  const sendEmail = (e: any) => {
    e.preventDefault();
    console.log("sending");
    emailjs
      .sendForm("", "", (form as any).current, {
        publicKey: "9PDNeXOyR2Rs2HSIr",
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
          ref={form}
          onSubmit={sendEmail}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="fontTest"
        >
          <p>
            <strong>Svarfrist:</strong> 13. mai
          </p>
          <label className="radio">
            <input type="radio" name="response" value="ja" />
            <span>Ja, jeg kommer!</span>
          </label>
          <label className="radio">
            <input type="radio" name="response" value="nei" />
            <span>Nei, jeg kan dessverre ikke komme.</span>
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
            <span>Allergier</span>
            <input
              type="text"
              name="allergier"
              placeholder="Gluten, laktose..."
            />
          </label>
          <button
            type="submit"
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
