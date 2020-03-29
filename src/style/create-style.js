import styled from "styled-components";
import Upload from "../assets/image/photo-upload.png";

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #cad1e5;
  min-height: 100vh;  

  button {
    -webkit-transition: .5s ease;
    -moz-transition: .5s ease;
    -o-transition: .5s ease;
    transition: .5s ease;
  }
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
    color: #fff;

    &::-webkit-input-placeholder {
      color: #dcdcdc;
    }
    &::-moz-placeholder {
      color: #dcdcdc;
    }
    &:-ms-input-placeholder {
      color: #dcdcdc;
    }
    &:-moz-placeholder {
      color: #dcdcdc;
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

    &:hover {
      background-color: #6d76bf;
      border-color: #6d76bf;
      color: #fff;
    }
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

  &:hover {
    background-color: #6d76bf;
    border-color: #6d76bf;
    color: #fff;
  }
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
      width: 90%;
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
  box-shadow: 0 0 5px 0px transparent;
  border-radius: 5px;
  padding: 12px 20px;
  color: #333;
  resize: none;

  &:focus {
    box-shadow: inset 0 0 5px 0px #cecece;
    outline: 0;
  }

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

  &:focus {
    box-shadow: inset 0 0 5px 0px #cecece;
    outline: 0;
  }

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
  position: relative;

  .dateicon {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 30px;
    top: 45px;
  }
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
      text-align: center;
    }

    th:first-child {
      text-align: left;
    }
  }

  tbody {
    tr td:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    tr td:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding-right: 30px;
    }
    tr {
      td {
        background-color: #eff2fa;
        padding: 8px 15px;
        text-align: center;
        color: #485195;
        font-weight: 500;
        font-size: 0.9em;

        input {
          color: #485195;
          font-weight: 500;
          font-size: 0.9em;
          width: 100%;
          padding: 8px 10px;
          box-sizing: border-box;
          text-align: center;
          border: 1px solid #e4e4e4;

          &:focus {
            border: 1px solid #6d76bf;
            border-radius: 5px;
            outline: 0;
          }
        }
      }

      td:first-child {
        text-align: left;
      }

      td:last-child {
        position: relative;
        min-width: 100px;

        button {
          position: absolute;
          top: 50%;
          margin-top: -13px;
          right: 10px;
          background-color: #fff;
          border: 0;
          height: 26px;
          width: 26px;
          text-align: center;
          font-size: 0.9em;
          line-height: 1em;
          border-radius: 50%;
          color: #fb1e1e;
          font-weight: 700;

          &:hover {
            background-color: #fb1e1e;
            color: #fff;
          }
        }
      }
    }

    .add_items {
      background-color: transparent;
      padding: 0px;

      button {
        background-color: #fff;
        text-align: center;
        padding: 15px 30px;
        box-shadow: 0px 0px 5px #c3c6ce;
        border: 0;
        border-radius: 5px;
        color: #485195;
        font-weight: 600;
        font-size: 1em;

        &:hover {
          background-color: #485195;
          color: #fff;
        }
      }
    }

    .subtotal_label {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 5px 15px;
    }

    .add_tax_calc .add_tax {
      margin-top: 10px;
      display: block;
    }

    .add_tax_calc td:last-child, .net_total td:last-child {
      padding-right: 0;
    }

    .tax.calculation {
      .tax {
        padding: 5px;
        border-radius: 5px;

        input {
          padding: 5px 15px;
          margin: 0 5px;
          border: 1px solid #e4e4e4;
          height: 40px;
        }

        .tax_type {
          color: #43486a;
          font-weight: 700;
          font-size: 1em;
        }
      }
      .tax_amount {
        color: #485195;
        font-weight: 500;
        margin: 0;
      }
    }

    .calculation {
      .discount {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      .discount_amount {
        display: flex;
        align-items: center;
        min-width: 100px;
        justify-content: center;
        color: #485195;
        font-weight: 500;
        margin: 0;
        
        span {
          color: #fd0404;
          font-size: 2em;
          padding-right: 5px;
          line-height: 1;
          margin-top: -6px;
        }
      }
      > td {
        padding: 0;
      }

      .blank {
        background-color: transparent;
      }

      .add_tax {
        button {
          position: relative;
          top: auto;
          right: 0;
          height: auto;
          width: 100%;
          border-radius: 5px;
          padding: 15px 15px 15px 40px;
          text-align: left;
          color: #6d76bf;

          span {
            border-radius: 50%;
            background-color: #eff2fa;
            width: 30px;
            height: 30px;
            font-size: 2em;
            line-height: 30px;
            font-weight: 400;
            position: absolute;
            text-align: center;
            left: 0;
            top: 50%;
            margin-top: -15px;
            -webkit-transition: .5s ease;
            -moz-transition: .5s ease;
            -o-transition: .5s ease;
            -webkit-transition: .5s ease;
            transition: .5s ease;
          }

          &:hover {
            background-color: #fff;
            color: #6d76bf;

            span {
              background-color: #6d76bf;
              color: #fff;
            }
          }
        }
      }

      .summary {
        border-radius: 5px;
      }
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
  align-items: center;
  padding: 5px 20px;
  border-radius: 5px;

  label,
  input,
  select {
    margin-bottom: 0px;
    box-sizing: border-box;
    padding: auto;
    border: 1px solid transparent;
    border-radius: 0;
    height: 40px;
  }

  label {
    border-right: 0;
    display: flex;
    align-items: center;
  }
  input,
  select {
    max-width: 100px;
  }
`;

export const TaxRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  label,
  input,
  select {
    margin-bottom: 0px;
    box-sizing: border-box;
    padding: 10px 15px;
    border: 1px solid #6d76bf;
    border-radius: 0;
    height: 46px;
  }
  .tax_type {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 0;
  }
`;

export const FinalTotal = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #485195;
  border-radius: 5px;

  label {
    margin: 0;
    color: #fff;
  }
`;

export const AdditionalRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 4em;
  padding: 1em;
  box-sizing: border-box;

  input {
    margin-bottom: 1em;
  }
`;

export const FooterRow = styled.div`
  height: 50px;
  width: 110%;
  background-color: #485195;
  margin: 5em -16px -16px;
`;
