const exec = require('child_process').exec,
    fastbootBtn = document.getElementById('fastboot_btn'),
    fastbootTxt = document.getElementById('fastboot_txt');
    rsdiv = document.getElementById('rs');


function execFun(cmd,callback){
    var rs = exec(cmd, (err, stdout, stderr) => {
    	        // console.log('err--->'+err);
    	        // console.log('stdout--->'+stdout);
    	        // console.log('stderr--->'+stderr);
                if(err){
                	// console.log('in-err--->'+err);
                	callback(-1,err);
                }
                else{
                	callback(1,stdout);
                }     
            });
}

fastbootBtn.onclick = function(){

    execFun(fastbootTxt.value,function(v,rs){
    	// console.log('rs------>'+rs);
        rsdiv.innerHTML="";
    	if(v<0){
    		rsdiv.innerHTML= "<h4>执行命令出错了</h4>";

    	}else{
    		rsdiv.innerHTML= "<h4>ok</h4>";
    	}
    });
    

}



