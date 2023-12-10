$(document).ready(function () {
    $('#loading').hide();
});

function chatGPT() {
    const api_key = "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";  //appl account key
    const api_endpoint = "https://api.openai.com/v1/chat/completions";
    const keywords = document.getElementById('keywords').value;
    //로딩 이미지를 보여줌
    $('#loading').show();
    
    //api용청에 사용할 옵션을 정의
    $.ajax({
        url : api_endpoint,
        method : 'POST',
        //api요청의 헤더를 설정
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${api_key}`
        },
        //보낼 메세지를 정의함
        //role = 메세지 역할을 할 user로 설정, content = 사용자가 입력한 메세지
        data : JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'system', 
                    content: 'You are a helpful assistant.' 
                },
                { 
                    role: 'user', 
                    content: keywords + '에 대하여 최대한 도움이 되는 답변을 해줘.' 
                
                }, 
            ],
            n : 1,
            max_tokens: 512, // 응답받을 메시지 최대 토큰(단어) 수 설정
            temperature: 0.5,   //모델 출력의 다양성
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
        }),
    }).then(function (response) {   
        //응답이 나올시 로딩 이미지 숨김
        $('#loading').hide();
        console.log(response);
        let result = document.getElementById('result');
        let pre = document.getElementById('pre');

        //let pre = document.getElementById('pre');
        
        pre.innerHTML = response.choices[0].message.content = response.choices[0].message.content.replace(/([가-힣a-zA-Z])[\.\!\?]/g, '$1.<br>\n');
        result.appendChild(pre);

        document.getElementById('keywords').value = ''
    }).catch(function(error){
        console.error("ERROR : ", error);
    });
}