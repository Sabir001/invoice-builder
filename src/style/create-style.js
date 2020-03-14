import styled from "styled-components";
import Upload from "../assets/image/photo-upload.png";

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #cad1e5;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

export const InnerRow = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
`;

export const ContentLeft = styled.div`
  flex: 0 0 75%;
  padding: 1em;
  box-sizing: border-box;
`;

export const ContentRight = styled.div`
  flex: 0 0 25%;
  padding: 2em;
  box-sizing: border-box;
`;

export const FormLeft = styled.div`
  flex: 1 1 auto;
  padding: 1em;
`;

export const FormRight = styled.div`
  flex: 1 1 auto;
  padding: 1em;
`;

export const MainHeader = styled.div`
  background-color: #22285c;
  padding: 50px 0 0;

  > div {
    background-color: #485195;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .row {
    padding: 0;

    > div {
      padding-top: 2em;
      padding-bottom: 2em;
    }
  }

  .invoice {
    margin: 0 0 0 auto;
    width: 250px;

    input {
      width: 100%;
    }
  }

  .header_buttons {
    background-color: #3c447f;
    border-top-right-radius: 10px;
  }

  .fileUploader {
    max-width: 250px;

    .fileContainer {

      background-color: #6d76bf;
      padding: 0;
      margin: 0;
      border: 1px dashed #fff;

      p {
        color: #fff;
        text-align: center;
        position: absolute;
        top: 20px;
        font-size: .9em;
        padding-left: 45px;

        &:before {
          content: "";
          background-image: url("${Upload}");
          position: absolute;
          left: 0;
          top: 0;
          width: 30px;
          height: 24px;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }

      .chooseFileButton {
        width: 100%;
        height: 80px;
        background-color: transparent;
        margin: 0;
        padding: 0;
      }
      .uploadPicturesWrapper {
        position: absolute;
        
        .uploadPictureContainer {
          width: 100%;
          margin: 0;
        }
      }
    
    
    }
  }

  label {
    color: #ffffff;
    font-size: 1em;
  }

  input {
    background-color: #6d76bf;
    border-radius: 5px;
    border: 0;
    padding: 15px 20px;

    &::-webkit-input-placeholder {
      color: #fff;
    }
    &::-moz-placeholder {
      color: #fff;
    }
    &:-ms-input-placeholder {
      color: #fff;
    }
    &:-moz-placeholder {
      color: #fff;
    }
  }
`;

export const ActionButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > button {
    width: auto;
    margin-right: 2%;
    border: 1px solid #9da5ea;
    background-color: transparent;
    padding: 10px;
    border-radius: 5px;
    color: #9da5ea;
  }

  > button:last-child {
    margin-right: 0;
  }
`;

export const SendButton = styled.button`
  width: 100%;
  background-color: #00d8c1;
  border: 0;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 1em;
  color: #fff;
  font-size: 0.9em;
  font-weight: 700;
`;

export const MainBody = styled.div`
  > div {
    background-color: #fff;
  }

  .bodySideControls {
    background-color: #eff2fa;

    select {
      background-color: #fff;
      width: 100%;
    }
  }

  .infoform {
    input {
      width: 90%
    }
  }

  .react-datepicker-wrapper input {
    box-sizing: border-box;
    background-color: #eff2fa;
    border: 0;
    border-radius: 5px;
    padding: 12px 20px;
    color: #333;
  }

  select {
    width: auto;
    box-sizing: border-box;
    background-color: #eff2fa;
    border: 0;
    border-radius: 5px;
    padding: 12px 20px;
    color: #333;
  }
`;

export const TextareaField = styled.textarea`
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  background-color: #eff2fa;
  border: 0;
  border-radius: 5px;
  padding: 12px 20px;
  color: #333;
  resize: none;

  &::-webkit-input-placeholder {
    color: #999;
  }
  &::-moz-placeholder {
    color: #999;
  }
  &:-ms-input-placeholder {
    color: #999;
  }
  &:-moz-placeholder {
    color: #999;
  }
`;

export const InputField = styled.input`
  width: auto;
  box-sizing: border-box;
  background-color: #eff2fa;
  border: 0;
  border-radius: 5px;
  padding: 12px 20px;
  color: #333;

  &::-webkit-input-placeholder {
    color: #999;
  }
  &::-moz-placeholder {
    color: #999;
  }
  &:-ms-input-placeholder {
    color: #999;
  }
  &:-moz-placeholder {
    color: #999;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin: 0px 0 1.5em 0;
`;

export const InputLabel = styled.label`
  margin: 0px 0 0.8em 0;
  color: #43486a;
  font-size: 1em;
  font-weight: 700;
  display: block;
`;

export const InlineInputLabel = styled.label`
  margin: 0px 1em 0.8em 0;
  color: #707070;
  font-size: 0.9em;
  display: inline-block;
`;

export const InlineInputField = styled.input`
  width: auto;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
`;

export const InvoiceTitle = styled.h2`
  font-size: 2em;
  font-weight: 100;
`;

export const TableMain = styled.table`
  width: 100%;
  border-spacing: 0 15px;

  thead {
    th {
      background-color: transparent;
      color: #9b9ead;
      text-align: left;
    }
  }

  tbody {
    tr td:first-child {
      border-top-left-radius: 5px;
    }
    tr td:last-child {
      border-top-right-radius: 5px;
    }
    tr td:first-child {
      border-bottom-left-radius: 5px;
    }
    tr td:last-child {
      border-bottom-right-radius: 5px;
    }
    tr {
      td {
        background-color: #eff2fa;
        padding: 5px;

        input {
          width: 100%;
          padding: 5px 10px;
          box-sizing: border-box;
        }
      }
    }

    .add_items {
      background-color: transparent;
    }

    .subtotal_label {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 5px 15px;
    }
  }
`;

export const TableTH = styled.th`
  padding: 10px;
`;

export const InvoiceItem = styled.input``;

export const SubmitRow = styled.div`
  margin: 2em 0 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 15px;

  .show_pdf {
    background-color: #29af36;
    border: 0px;
    padding: 7px 30px;
    border-radius: 4px;
    color: #fff;
    margin: 0 15px 0 0;
    font-size: 0.9em;
    text-decoration: none;
  }
`;

export const SubmitButton = styled.button`
  background-color: #3a98d0;
  border: 0px;
  padding: 10px 30px;
  border-radius: 4px;
  color: #fff;
  margin: 0 15px 0 0;
`;

export const Discounts = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;

  .title,
  select,
  input {
    margin-left: 15px;
  }
`;
