import styled from "styled-components";

export const HalfWidthLeft = styled.div`
  flex: 1;
  padding: 1em;

  label {
    width: 70px;
  }
`;

export const HalfWidthRight = styled.div`
  flex: 1;
  padding: 1em;
  text-align: right;

  .react-datepicker-wrapper input {
    width: auto;
    padding: 10px;
    box-sizing: border-box;
  }
`;

export const InputField = styled.input`
  width: auto;
  padding: 10px;
  box-sizing: border-box;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin: 0px 0 1.5em 0;
`;

export const InputLabel = styled.label`
  margin: 0px 0 0.8em 0;
  color: #707070;
  font-size: 0.9em;
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
  thead {
    background-color: #333333;
    color: #ffffff;
  }

  tbody {
    tr {
      td {
        input {
          width: 100%;
          padding: 5px 10px;
          box-sizing: border-box;
        }
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
`;

export const SubmitButton = styled.button`
  background-color: #3a98d0;
  border: 0px;
  padding: 10px 30px;
  border-radius: 4px;
  color: #fff;
  margin: 0 15px 0 0;
`;
