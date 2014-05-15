function getStringFecha(fecha)
{
	//2014-05-28 19:04:39
	var aux = fecha.split(' ');
	var date = aux[0];
	var hour = aux[1];
	
	var auxHora = hour.split(':');	
	var hourOutSeconds = auxHora[0] +':'+ auxHora[1];
	
	var auxFecha = date.split('-');
	var day = auxFecha[2];
	var mesNumber = auxFecha[1];
	var anio = auxFecha[0];
	var mesString;
	
	switch(mesNumber)
	{
		case '01':
			mesString = 'Ene.';
		break;
		case '02':
			mesString = 'Feb.';
		break;
		case '03':
			mesString = 'Mar.';
		break;
		case '04':
			mesString = 'Abr.';
		break;
		case '05':
			mesString = 'May.';
		break;
		case '06':
			mesString = 'Jun.';
		break;	
		case '07':
			mesString = 'Jul.';
		break;
		case '08':
			mesString = 'Ago.';
		break;
		case '09':
			mesString = 'Set.';
		break;
		case '10':
			mesString = 'Oct.';
		break;
		case '11':
			mesString = 'Nov.';
		break;
		case '12':
			mesString = 'Dic.';
		break;																			
	}	
	
	return (day +' '+mesString+' '+anio+' - '+hourOutSeconds+' Hora Local');
}