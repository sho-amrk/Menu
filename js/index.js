document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const conteiner = document.getElementById('conteiner');

    nav.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const keyword = event.target.dataset.search;
            searchCSV(keyword);
        }
    });

    function searchCSV(keyword) {
        const csvFilePath = 'csv/data.csv'; // CSVファイルのパスを指定
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const csvData = xhr.responseText;
                const result = parseCSV(csvData, keyword);
                displayResult(result);
            }
        };
        xhr.open('GET', csvFilePath, true);
        xhr.send();
    }

    function searchCSV(csvData, keyword) {
        const rows = csvData.split('\n');
        const result = rows.find(row => row.startsWith(keyword));
        return result ? result.split(',') : null;
    }

    function displayResult(data) {
        if (!data) {
            conteiner.innerHTML = '該当するデータが見つかりませんでした。';
            return;
        }

        const content = document.createElement('div');
        content.className = 'content';

        const image = document.createElement('img');
        image.src = data[2]; // CSVの3番目のカラムの値

        const link = document.createElement('a');
        link.textContent = data[1]; // CSVの2番目のカラムの値

        content.appendChild(image);
        content.appendChild(link);

        conteiner.innerHTML = ''; // 出力をリセット
        conteiner.appendChild(content);
    }
});