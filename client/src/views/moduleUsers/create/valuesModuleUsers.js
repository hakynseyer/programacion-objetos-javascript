module.exports = (Emitter, Resources) => {
  const values = {
    Name: null,
    Alias: null,
    Email: null,
    Password: null,
    RepeatPassword: null,
    State: null
  }

  for (const input of Object.keys(values)) {
    if (input !== 'State') values[input] = Emitter.emit('[formInput]:getValue', Resources.form[`form${input}`].name)
  }

  const rawState = Emitter.emit('[formCheckbox]:isChecked', Resources.form.formState.name)

  for (const key of Object.keys(rawState)) {
    if (Resources.form.formState.checkboxes[0].label.includes(key)) {
      values.State = rawState[key]
      break
    }
  }

  return values
}
