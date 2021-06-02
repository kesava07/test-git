 const byteCharacters = atob(response[0].file);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                const fileBlob = new Blob([byteArray], { type: response[0].contentType });
                FileSaver.saveAs(fileBlob, response[0].fileName);


downloadFile(response, filename) {
        var newBlob = new Blob([response], {type: 'application/pdf'})
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob)
          return
        }
        const data = window.URL.createObjectURL(newBlob)
        var link = document.createElement('a')
        link.href = data
        link.download = filename + '.pdf'
        link.click()
        setTimeout(function () {
          window.URL.revokeObjectURL(data)
        }, 100)
},
  },
    
    savePdf() {
      let post ={
        html : document.getElementById('letter-content').innerHTML,
        footer: document.getElementById('footer-text').innerHTML,
        search:this.search,
        letter:this.$route.params.letter
      }
      axios.post(process.env.VUE_APP_API_URL + '/api/'+window.API_CREATE_PDF_DOC,{post},
      {headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ca3d15b6-3f82-4050-8267-3a8db89a4e20',
      }},
       { responseType: 'arraybuffer'}).then(response => {
         if(response.data[window.STATUS] === 200){
         var byteCharacters = atob(response[window.DATA][window.DATA]);
           var byteNumbers = new Array(byteCharacters.length);
           for (var i = 0; i < byteCharacters.length; i++) {
             byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
        var byteArray = new Uint8Array(byteNumbers);
         this.downloadFile(byteArray,response[window.DATA]['name']);
       }else{
          this.$notify.error(this.$i18n.t('ERROR_MAKING_PDF'))
       }
      });
    },
