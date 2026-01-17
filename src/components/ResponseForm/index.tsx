import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import aplussa from "../../assets/aplussa.svg";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

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
  const [isSending, setIsSending] = useState(false);
  const [inviteType, setInviteType] = useState<InviteTypes | undefined>(
    undefined,
  );
  const [mailError, setMailError] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SignupFormType>({ shouldUnregister: true });

  const response = watch("response");

  const sendEmail = async (data: any) => {
    console.log(import.meta.env);

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
    <div className={styles.responseFormContainer}>
      <div className={styles.formContent}>
        <h1 className={styles.formHeading}>Kjem du?</h1>
        <form onSubmit={handleSubmit(sendEmail)} className={styles.form}>
          <p>
            <strong>Svarfrist:</strong> 13. mai
          </p>
          {mailError ? (
            <div className={styles.errorAlert}>
              <AlertCircleIcon color="#d31b1b" />
              <span>
                Vi kunne ikke sende svaret ditt akkurat nå. Prøv igjen eller ta
                kontakt med oss direkte.
              </span>
            </div>
          ) : null}
          <h4 className={styles.sectionHeading}>
            Har du blitt invitert med følge?
          </h4>
          <p>
            Sjekk invitasjonen, hvis du er usikker kan du ta kontakt med Anna
            eller Aksel direkte.
          </p>
          <div className={styles.inviteButtons}>
            <button
              type="button"
              className={`${styles.inviteButton} ${
                inviteType === InviteTypes.Alone
                  ? styles.inviteButtonActive
                  : ""
              }`}
              onClick={() => setInviteType(InviteTypes.Alone)}
            >
              Uten følge
            </button>
            <button
              className={`${styles.inviteButton} ${
                inviteType === InviteTypes.PlusOne
                  ? styles.inviteButtonActive
                  : ""
              }`}
              type="button"
              onClick={() => setInviteType(InviteTypes.PlusOne)}
            >
              Med følge
            </button>
          </div>
          {typeof inviteType === "undefined" ? null : (
            <>
              <div className={styles.responseOptions}>
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
                  className={`errorMessage ${
                    errors.response ? styles.errorVisible : styles.errorHidden
                  }`}
                >
                  {(errors.response && "Svar på invitasjonen er påkrevd") ||
                    "Placeholder"}
                </span>
              </div>
              <div className={styles.fieldGrid}>
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
                    className={`errorMessage ${
                      errors.name?.message
                        ? styles.errorVisible
                        : styles.errorHidden
                    }`}
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
                    className={`errorMessage ${
                      errors.phone?.message
                        ? styles.errorVisible
                        : styles.errorHidden
                    }`}
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
                      className={`errorMessage ${
                        errors.plusOneName?.message
                          ? styles.errorVisible
                          : styles.errorHidden
                      }`}
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
                    <span className={styles.allergiesNote}>
                      Noter gjerne hvem som har allergien; feks. "Aksel: gluten,
                      Anna: laktose"
                    </span>
                  ) : null}
                </label>
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSending}
              >
                {isSending ? <Spinner /> : "Send inn"}
              </button>
            </>
          )}
        </form>
      </div>
      <img className={styles.aplussa} src={aplussa.src} />
    </div>
  );
};

export const Spinner = () => <div className={styles.spinner} />;
