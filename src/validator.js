export const validateRegisterForm = args => {
  var errors = {}
  if (!args.name) errors.name = "this field cann't be blank"
  if (!args.email) errors.email =  "missing email";
  if (!args.password) errors.password =  "this field cann't be blank";

 return errors
}

export const validateClientsForm = args => {
  var errors = {}
  if (!args.client) errors.client =  "this field cann't be blank";
  if (!args.project) errors.project =  "this field cann't be blank";
  if (!args.department) errors.department =  "this field cann't be blank";
  if (!args.estimate) errors.estimate =  "this field cann't be blank";
  if (!args.budget) errors.budget =  "this field cann't be blank";
  if (!args.start_date) errors.start_date =  "this field cann't be blank";

 return errors
}
