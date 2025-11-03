import { Container } from "./Container";

export const ResponseForm = () => {
  return (
    <Container className="fontTest">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1>Kjem du?</h1>
        <label>
          <span>Navn</span>
          <input type="text" name="Navn" />
        </label>
        <label>
          <span>Telefonnummer</span>
          <input type="text" name="tlf" />
        </label>
        <label className="radio">
          <input type="radio" name="response" value="ja" /> Ja, jeg kommer!
        </label>
        <label className="radio">
          <input type="radio" name="response" value="nei" /> Nei, jeg kan
          dessverre ikke komme.
        </label>
        <label>
          Allergier
          <input
            type="text"
            name="allergier"
            placeholder="Gluten, laktose..."
          />
        </label>
      </div>
    </Container>
  );
};
