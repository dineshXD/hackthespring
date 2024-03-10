import { Nav } from "../Nav";

export const AddKey = () => {
  return (
    <>
      <Nav />
      <form className="form-fields">
        <div
          className="form-field"
          style={{ margin: "20px", display: "flex", gap: "1rem" }}
        >
          <label style={{ fontFamily: "Anta" }}>
            Add Google Gemini Api keys
          </label>
          <input
            type="text"
            placeholder="add gemini key"
            className="form-input"
            style={{ fontFamily: "Anta" }}
            required
          />
          <button>Save</button>
          <p style={{ fontFamily: "Anta" }}>
            Instructions : go to go https://aistudio.google.com/app/apikey to
            generate your api keys and paste it here
          </p>
        </div>
      </form>
    </>
  );
};
