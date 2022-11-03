const spinner = async () => {
	let template = await fetch("html/spinner.html")
	template = await template.text()

	return({
		template: template
	})
}

export default spinner