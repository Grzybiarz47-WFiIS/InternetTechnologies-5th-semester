<form name="form">            
	<label for="fname">Imie:</label><br/>
    <input value="<?php if(isset($formData)) echo $formData['fname']; ?>" type="text" id="fname" name="fname" /><br/>
    <label for="lname">Nazwisko:</label><br/>
    <input value="<?php if(isset($formData)) echo $formData['lname']; ?>" type="text" id="lname" name="lname" /><br/>
	<label for="city">Miejscowosc:</label><br/>
    <input value="<?php if(isset($formData)) echo $formData['city']; ?>" type="text" id="city" name="city" /><br/>
	<span id="data"><input type="button" value="Zapisz" onclick="fn_save()" /></span><br/>
    <span id="response" style="color: green"></span>
</form>