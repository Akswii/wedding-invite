import { useEffect, useState } from "react";
import { Container } from "./Container";
import emailjs from "@emailjs/browser";
import aplussa from "../assets/aplussa.svg";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface SignupFormType {
  response: string;
  name: string;
  phone: string;
  plusOneName: string;
  allergies: string;
}

enum InviteTypes {
  PlusOne = "plusOne",
  Alone = "alone",
}

export const ResponseForm = () => {
  const [isSending, setIsSending] = useState(true);
  const [inviteType, setInviteType] = useState<InviteTypes | undefined>(
    undefined,
  );
  const [mailError, setMailError] = useState(true);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SignupFormType>({ shouldUnregister: true });

  const response = watch("response");

  const sendEmail = async (data: any) => {
    try {
      setIsSending(true);
      setMailError(false);

      await emailjs.send(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        { ...data, plusOne: inviteType === InviteTypes.PlusOne ? "Ja" : "Nei" },
        { publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY },
      );

      window.location.href = "/takk-for-svar";
    } catch (err) {
      setMailError(true);
    } finally {
      setIsSending(false);
    }
  };

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, ""); // strip everything except 0–9
    return (digits.length >= 8 && digits.length <= 15) || response === "nei";
  };

  useEffect(() => {
    if (response === "nei") {
      trigger("phone");
    }
  }, [response]);

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
          style={{
            display: "grid",
            justifyItems: "start",
          }}
          className="fontTest"
        >
          <p>
            <strong>Svarfrist:</strong> 13. mai
          </p>
          {mailError ? (
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                border: "1px solid #d31b1b",
                backgroundColor: "#ffcece",
                padding: "1rem 0.5rem",
                color: "black",
                borderRadius: "0.5rem",
                fontSize: "14px",
              }}
            >
              <AlertCircleIcon color="#d31b1b" />
              <span>
                Vi kunne ikke sende svaret ditt akkurat nå. Prøv igjen eller ta
                kontakt med oss direkte.
              </span>
            </div>
          ) : null}
          <h4 style={{ marginBottom: 0 }}>Har du blitt invitert med følge?</h4>
          <p>
            Sjekk invitasjonen, hvis du er usikker kan du ta kontakt med Anna
            eller Aksel direkte.
          </p>
          <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem" }}>
            <button
              type="button"
              style={
                inviteType === InviteTypes.Alone
                  ? { backgroundColor: "var(--fontColor)", color: "white" }
                  : undefined
              }
              onClick={() => setInviteType(InviteTypes.Alone)}
            >
              Uten følge
            </button>
            <button
              style={
                inviteType === InviteTypes.PlusOne
                  ? { backgroundColor: "var(--fontColor)", color: "white" }
                  : undefined
              }
              type="button"
              onClick={() => setInviteType(InviteTypes.PlusOne)}
            >
              Med følge
            </button>
          </div>
          {typeof inviteType === "undefined" ? null : (
            <>
              <div
                style={{
                  margin: "1rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label className="radio">
                  <input
                    {...register("response", { required: true })}
                    type="radio"
                    value="ja"
                  />
                  <span>
                    Ja, {inviteType === InviteTypes.PlusOne ? "vi" : "jeg"}{" "}
                    kommer!
                  </span>
                </label>
                <label className="radio">
                  <input
                    {...register("response", { required: true })}
                    type="radio"
                    value="nei"
                    className={errors?.response && "error"}
                  />
                  <span>
                    Nei, {inviteType === InviteTypes.PlusOne ? "vi" : "jeg"} kan
                    dessverre ikke komme.
                  </span>
                </label>
                <span
                  className="errorMessage"
                  style={{
                    visibility: errors.response ? "visible" : "hidden",
                  }}
                >
                  {(errors.response && "Svar på invitasjonen er påkrevd") ||
                    "Placeholder"}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  justifyItems: "start",
                }}
              >
                <label>
                  <span className="label required">Navn</span>
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
                <label>
                  <span
                    className={`label${response !== "nei" ? " required" : ""}`}
                  >
                    Telefonnummer
                  </span>
                  <input
                    {...register("phone", {
                      required: {
                        value: response !== "nei",
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
                {inviteType === InviteTypes.PlusOne ? (
                  <label>
                    <span
                      className={`label ${response !== "nei" ? "required" : ""}`}
                    >
                      Navn på følge
                    </span>
                    <input
                      {...register("plusOneName", {
                        required: {
                          value: response !== "nei",
                          message: "Navn på følge er påkrevd.",
                        },
                        pattern: {
                          value: /^[\p{L}][\p{L}\p{M}' -]*$/u,
                          message: "Navnet må være bokstaver.",
                        },
                      })}
                      type="text"
                      placeholder="Navn navnesen"
                      className={errors?.plusOneName && "hasError"}
                    />
                    <span
                      className="errorMessage"
                      style={{
                        visibility: errors.plusOneName?.message
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      {errors.plusOneName?.message || "Placeholder"}
                    </span>
                  </label>
                ) : null}
                <label>
                  <span className="label">Allergier</span>
                  <input
                    {...register("allergies")}
                    type="text"
                    placeholder="Gluten, laktose..."
                  />
                  {inviteType === InviteTypes.PlusOne ? (
                    <span
                      style={{
                        color: "#573635",
                        fontSize: "14px",
                        marginLeft: "0.5rem",
                      }}
                    >
                      Noter gjerne hvem som har allergien; feks. "Aksel: gluten,
                      Anna: laktose"
                    </span>
                  ) : null}
                </label>
              </div>
              <button
                type="submit"
                style={{
                  marginTop: "1rem",
                  alignSelf: "flex-start",
                  fontSize: "24px",
                }}
                disabled={isSending ? true : undefined}
              >
                {isSending ? <Spinner /> : "Send inn"}
              </button>
            </>
          )}
        </form>
      </div>
      <img
        src={aplussa.src}
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

export const Spinner = () => (
  <div
    style={{
      width: "28px",
      height: "28px",
      border: "3px solid rgba(0,0,0,0.15)",
      borderTopColor: "var(--fontColor)", // your theme color
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }}
  />
);
