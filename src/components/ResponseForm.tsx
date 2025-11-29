import { useRef, useState } from "react";
import { Container } from "./Container";
import emailjs from "@emailjs/browser";
import cupid from "../assets/cupid.svg";
import { useForm } from "react-hook-form";

interface SignupFormType {
  response: string;
  name: string;
  phone: string;
  allergies: string;
}

enum possibleSelections {
  PlusOne = "plusOne",
  Alone = "alone",
}

export const ResponseForm = () => {
  const [inviteType, setInviteType] = useState<possibleSelections | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SignupFormType>();

  const sendEmail = (data: any) => {
    console.log(data);

    return;
    emailjs
      .sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        (form as any).current,
        {
          publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          window.location.href = "/takk-for-svar";
          // redirect to thanks page
        },
        () => {
          // let them know something went wrong and to contact us directly
        },
      );
  };

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, ""); // strip everything except 0–9
    return digits.length >= 8 && digits.length <= 15;
  };

  console.log(inviteType);

  return (
    <Container
      align="left"
      style={{
        padding: "0 5rem",
        boxSizing: "border-box",
        justifyContent: "flex-start",
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ marginBottom: 0 }}>Kjem du?</h1>
        <form
          onSubmit={handleSubmit(sendEmail)}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          className="fontTest"
        >
          <p>
            <strong>Svarfrist:</strong> 13. mai
          </p>

          <h4>Har du blitt invitert med følge?</h4>
          <span>
            Sjekk invitasjonen, hvis du er usikker kan du ta kontakt med Anna
            eller Aksel direkte.
          </span>
          <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={() => setInviteType(possibleSelections.PlusOne)}
            >
              Med følge
            </button>
            <button
              type="button"
              onClick={() => setInviteType(possibleSelections.Alone)}
            >
              Uten følge
            </button>
          </div>
          <hr style={{ width: "100%" }} />
          {typeof inviteType === "undefined" ? null : (
            <>
              <label className="radio">
                <input
                  {...register("response", { required: true })}
                  type="radio"
                  value="ja"
                />
                <span>Ja, jeg kommer!</span>
              </label>
              <label className="radio">
                <input
                  {...register("response", { required: true })}
                  type="radio"
                  value="nei"
                  className={errors?.response && "error"}
                />
                <span>Nei, jeg kan dessverre ikke komme.</span>
              </label>
              <label>
                <span className="label">Navn</span>
                <input
                  {...register("name", {
                    required: { value: true, message: "Navn er påkrevd." },
                    pattern: {
                      value: /^[\p{L}][\p{L}\p{M}' -]*$/u,
                      message: "Navnet må være bokstaver.",
                    },
                  })}
                  type="text"
                  placeholder="Navn navnesen"
                  className={errors?.name && "hasError"}
                />
                <span
                  className="errorMessage"
                  style={{
                    visibility: errors.name?.message ? "visible" : "hidden",
                  }}
                >
                  {errors.name?.message || "Placeholder"}
                </span>
              </label>
              {inviteType === possibleSelections.PlusOne ? (
                <label>
                  <span className="label">Navn på følge</span>
                  <input
                    {...register("name", {
                      required: { value: true, message: "Navn er påkrevd." },
                      pattern: {
                        value: /^[\p{L}][\p{L}\p{M}' -]*$/u,
                        message: "Navnet må være bokstaver.",
                      },
                    })}
                    type="text"
                    placeholder="Navn navnesen"
                    className={errors?.name && "hasError"}
                  />
                  <span
                    className="errorMessage"
                    style={{
                      visibility: errors.name?.message ? "visible" : "hidden",
                    }}
                  >
                    {errors.name?.message || "Placeholder"}
                  </span>
                </label>
              ) : null}
              <label>
                <span className="label">Telefonnummer</span>
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Telefonnummer er påkrevd.",
                    },
                    validate: (value) =>
                      isValidPhone(value) || "Skriv et gyldig telefonnummer",
                  })}
                  type="text"
                  placeholder="XXX XX XXX"
                  className={errors.phone?.message && "hasError"}
                />
                <span
                  className="errorMessage"
                  style={{
                    visibility: errors.phone?.message ? "visible" : "hidden",
                  }}
                >
                  {errors.phone?.message || "Placeholder"}
                </span>
              </label>
              <label>
                <span className="label">Allergier</span>
                <input
                  {...register("allergies")}
                  type="text"
                  placeholder="Gluten, laktose..."
                />
              </label>
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  fontSize: "24px",
                }}
              >
                Send inn
              </button>
            </>
          )}
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
