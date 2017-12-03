/*
 *  AUTHOR  MIRS1701TL Hirokazu SUZUKI
 */

/*
 *  隕句�縺励↓逡ｪ蜿ｷ縺ｨID繧呈険繧矩未謨ｰ縲�
 *  迴ｾ迥ｶ縺ｧ縺ｯh3縺ｾ縺ｧ蟇ｾ蠢懊＠縺ｦ縺�∪縺吶�
 */
$(function () {
    var h1Num = 0;
    var h2Num = 0;
    var h3Num = 0;
    var heads = $(":header[class!=no-numbering]");

    for (var i = 0; i < heads.length; i++)
    {
        switch (heads[i].tagName)
        {
            case "H1":
                h1Num++;
                h2Num = 0;
                h3Num = 0;
                heads[i].id = h1Num.toString();
                heads[i].prepend(h1Num.toString() + ". ");
                break;
            case "H2":
                h2Num++;
                h3Num = 0;
                heads[i].id = h1Num.toString()+"-"+h2Num.toString();
                heads[i].prepend(
                    h1Num.toString() + "." + h2Num.toString() + ". "
                );
                break;
            case "H3":
                h3Num++;
                heads[i].id = h1Num.toString()+"-"+h2Num.toString()+"-"+h3Num.toString();
                heads[i].prepend(
                    h1Num.toString() + "." + h2Num.toString() + "." + h3Num.toString() + ". "
                );
                break;
            default:
                break;
        }
    }
});



/*
 *  逶ｮ谺｡繧剃ｽ懊ｋ髢｢謨ｰ鄒､縲�
 *  迴ｾ迥ｶh3縺ｮ逶ｮ谺｡縺ｾ縺ｧ蟇ｾ蠢懊＠縺ｦ縺�∪縺吶�
 */
//  h1逕ｨ
$(function () {
    var index = $("ul.index-h1");
    var elems = $("h1[class!=no-numbering]");
    for (var i = 0; i < elems.length; i++)
    {
        var list = $("<li>");
        var anchor = $(
            "<a href='"+"#"+elems[i].id.toString()+"'>"+elems[i].innerHTML.toString()+"</a>"
        );
        list.append(anchor);
        index.append(list);
    }
});

//  h2逕ｨ
$(function () {
    var elems = $("ul.index-h2, h1[class!=no-numbering], h2[class!=no-numbering]");
    for (var i = 0; i < elems.length; i++)
    {
        if (elems[i].tagName != "UL")
        {
            continue;
        }
        var indexID = elems[i++].id;
        for (; i < elems.length; i++)
        {
            if (elems[i].tagName == "H1")
            {
                break;
            }
            var list = $("<li>");
            var anchor = $(
                "<a href='" + "#" + elems[i].id.toString() + "'>" + elems[i].innerHTML.toString() + "</a>"
            );
            list.append(anchor);
            $("#" + indexID).append(list);
        }
    }
});

//  h3逕ｨ
$(function () {
    var elems = $("ul.index-h3, h2[class!=no-numbering], h3[class!=no-numbering]");
    for (var i = 0; i < elems.length; i++)
    {
        if (elems[i].tagName != "UL")
        {
            continue;
        }
        var indexID = elems[i++].id;
        for (; i < elems.length; i++)
        {
            if (elems[i].tagName == "H2")
            {
                break;
            }
            var list = $("<li>");
            var anchor = $(
                "<a href='" + "#" + elems[i].id.toString() + "'>" + elems[i].innerHTML.toString() + "</a>"
            );
            list.append(anchor);
            $("#" + indexID).append(list);
        }
    }
});



/*
 *  蝗ｳ陦ｨ逡ｪ蜿ｷ繧呈険繧矩未謨ｰ
 */
$(function () {
    var tbNum = 0, fgNum = 0;
    var elems = $("figure[id], table[id]");
    for (var i = 0; i < elems.length; i++)
    {
        if (elems[i].id.length == 0)
        {
            continue;
        }
        var elemID = elems[i].id;
        switch (elems[i].tagName)
        {
            case "FIGURE":
                fgNum++;
                $("#" + elemID + " > figcaption").prepend("Fig." + fgNum.toString() + " ");
                var anchor = $("<a href='#" + elemID + "'>Fig." + fgNum.toString() + "</a>");
                $("." + elemID).append(anchor);
                break;
            case "TABLE":
                tbNum++;
                $("#" + elemID + " > caption").prepend("Table." + tbNum.toString() + " ");
                var anchor = $("<a href='#" + elemID + "'>Table." + tbNum.toString() + "</a>");
                $("." + elemID).append(anchor);
                break;
            default:
                break;
        }
    }
});



/*
 *  繝医ャ繝励↓謌ｻ繧九�繧ｿ繝ｳ
 */
$(function() {
    var topBtn = $('#to-page-top');
    topBtn.hide();

    $(window).scroll(function()
    {
        if($(this).scrollTop() > 80)
        {
            topBtn.fadeIn();
        }
        else
        {
            topBtn.fadeOut();
        }
    });

    // 繝懊ち繝ｳ繧偵け繝ｪ繝�け縺励◆繧峨√せ繧ｯ繝ｭ繝ｼ繝ｫ縺励※荳翫↓謌ｻ繧�
    topBtn.click(function() {
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });
});



/*
 *  tsvからtableを作る関数
 */
$(function () {
    var tables = $("table.tsv");
    $.each(tables, function (_, table) {
        var csvData = [];
        var filePath = "./"+table.classList[1].replace("src-", "");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, false);
        xhr.send(null);
        var lines = xhr.responseText.split("\n");
        lines.forEach(function (line) {
            var cells = line.split("\t");
            if(cells.length != 1) {
                csvData.push(cells);
            }
        });
        var i = 0;
        var anchorNum = -1;
        csvData.forEach(function (row) {
            var j = 0;
            var tr = $("<tr></tr>").appendTo(table);
            row.forEach(function (data) {
                var tData = data;
                var td;
                if (i == 0) {
                    if (data.indexOf("$anchor$") != -1) {
                        tData = data.replace("$anchor$", "");
                        anchorNum = j;
                    }
                    td = $("<th></th>").appendTo(tr);
                }
                else {
                    td = $("<td></td>").appendTo(tr);
                }
                if (j == anchorNum && i != 0) {
                    tData = $("<a href = '"+data+"'>リンク</a>");
                }
                td.append(tData);
                j++;
            });
            i++;
        });
        console.log(anchorNum);
    });
});
