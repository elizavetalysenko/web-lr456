export class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	Check(value)
	{
        return this.value <= value ? true : false;
	}
}