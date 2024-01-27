export type FieldCardParams = {
  type?: string;
};

const types: string[] = ["numeric", "column", "character"];

export const fieldCard = (params: FieldCardParams): string => {
  const options: string = types
    .map((type) => {
      return `<option ${
        params.type == type ? "selected" : ""
      } value="${type}">${type}</option>`;
    })
    .join("");

  return `<div class="card blockr-create-field mb-2">
    <div class = "card-body">
      <input type="text" class="blockr-create-field-name mb-2 form-control form-control-sm" placeholder="Field name">
      <select class = "form-select blockr-create-field-type">
        ${options}
      </select>
      <p class = "blockr-create-field-preview mt-1 ms-1">
        <span class='text-danger'>must give the field a name</span>
      </p>
    </div>
  </div>`;
};
