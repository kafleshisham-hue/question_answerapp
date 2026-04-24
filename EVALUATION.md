# Assignment 6 Evaluation

## Architecture classification

This app is a **hybrid** system with a strong retrieval-first component:

* country records are stored as structured JSON data in `data/gold/countries.json`
* the server selects the most relevant country record based on the user's question
* only the selected country record is passed into the model prompt
* the model still generates natural language answers based on that record

This is more robust than a prompt-only implementation because it reduces the model context and makes the source of truth explicit.

## Data flow

1. `data/gold/countries.json` contains structured country facts.
2. `lib/countries.ts` loads the country records and finds the relevant country for each query.
3. `app/api/chat/route.ts` builds a prompt using the selected country record.
4. The model generates an answer from that single country context.
5. The React UI displays the question, the answer, and interactive country cards.

## Evaluation cases

### Representative cases

1. **What is the capital of India?**
   * Expected: New Delhi
2. **What languages are spoken in Canada?**
   * Expected: English, French
3. **What is Brazil known for?**
   * Expected: Amazon rainforest and large South American size
4. **Tell me about Egypt's history.**
   * Expected: pyramids, Nile, ancient civilization
5. **Where is South Africa located?**
   * Expected: southern tip of Africa

### Failure cases

1. **What is the currency of Japan?**
   * This should not be answered from the dataset because the currency field is not included.
   * Expected: a clear response that the information is not available.
2. **Tell me about Argentina.**
   * Argentina is not in the current dataset.
   * Expected: a response that the system does not have data for that country.

## Baseline comparison

Baseline: the earlier app design used a larger prompt with all country text included in the system instruction.

Improved design:

* searches the country database first
* passes only the relevant country record into the model
* reduces model context and limits hallucination
* makes the app easier to debug and evaluate

## Improvement summary

The meaningful improvement made for Assignment 6 is:

* structured country records in `data/gold/countries.json`
* retrieval of the relevant country record in `lib/countries.ts`
* a safer prompt in `app/api/chat/route.ts`
* a cleaner UI based on structured country metadata in `app/page.tsx`

This is backed by the evaluation cases above and the architecture described here.
