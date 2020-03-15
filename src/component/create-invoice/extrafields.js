

      {/* Right */}
      <HalfWidthRight>
        <InvoiceTitle>Invoice</InvoiceTitle>

        <InputWrapper>
          <InlineInputLabel htmlFor="invoice-date">Date:</InlineInputLabel>
          <DatePicker
            showPopperArrow={false}
            selected={invoiceDate}
            onChange={date => setinvoiceDate(date)}
          />
        </InputWrapper>

        <InputWrapper>
          <InlineInputLabel htmlFor="due-date">
            Payment Terms:
          </InlineInputLabel>
          <InlineInputField
            type="text"
            name="payment_terms"
            placeholder="Terms"
            value={terms}
            onChange={e => setTerms(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InlineInputLabel htmlFor="due-date">Due Date:</InlineInputLabel>
          <DatePicker
            showPopperArrow={false}
            selected={dueDate}
            onChange={date => setDueDate(date)}
          />
        </InputWrapper>

        <InputWrapper>
          <InlineInputLabel htmlFor="balance-due">
            Balance Due:
          </InlineInputLabel>
          <InlineInputField
            type="number"
            name="balance-due"
            placeholder="Balance due"
            value={dueBanalce}
            onChange={e => setdueBanalce(e.target.value)}
          />
        </InputWrapper>
      </HalfWidthRight>
    </Row>

    <Row>
      


      