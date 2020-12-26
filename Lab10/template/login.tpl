<form name="form">            
	<label for="login">Login:</label><br/>
    <input value="<?php if(isset($formData)) echo $formData['login']; ?>" type="text" id="login" name="login" /><br/>
    <label for="pass">Has³o:</label><br/>
    <input value="<?php if(isset($formData)) echo $formData['pass']; ?>" type="password" id="pass" name="pass" /><br/>
	<span id="data"><input type="button" value="<?php echo $data['button']; ?>" onclick="send_form('<?php echo $data['type']; ?>')" /></span><br/>
    <span id="response" style="color: green"></span>
</form>