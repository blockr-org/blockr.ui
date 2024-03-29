export type Field = {
  name: string;
  type: string;
};

const types: string[] = [
  "numeric",
  "range",
  "variable",
  "string",
  "switch",
  "submit",
  "upload",
  "filebrowser",
];

export const fieldCard = (params: Field): string => {
  const options: string = types
    .map((type) => {
      return `<option ${
        params.type == `new_${type}_field` ? "selected" : ""
      } value="new_${type}_field">${type}</option>`;
    })
    .join("");

  return `<div class="card blockr-create-field mb-2">
    <div class="card-body">
      <div class="d-flex">
        <div class="flex-grow-1">
          <input value="${
            params.name
          }" type="text" class="blockr-create-field-name mb-2 form-control form-control-sm" placeholder="Field name">
        </div>
        <div class="flex-shrink-1">
          <button class="ms-2 btn btn-sm bg-danger blockr-create-field-delete"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <select class = "form-select blockr-create-field-type">
        ${options}
      </select>
      <p class = "blockr-create-field-preview mt-1 ms-1">
        ${
          params.name.length <= 0
            ? "<span class='text-danger'>must give the field a name</span>"
            : ""
        }
      </p>
    </div>
  </div>`;
};
