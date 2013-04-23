(function(){
    var origAbout = SyntaxHighlighter.config.strings.aboutDialog;
    SyntaxHighlighter.config.clipboardSwf = 'libs/js/syntaxhighlighter2/clipboard.swf';
    SyntaxHighlighter.config.strings = {
           expandSource : '展开代码',
           viewSource : '查看代码',
           copyToClipboard : '复制代码',
           copyToClipboardConfirmation : '代码复制成功',
           print : '打印',
           help: '?',
           noBrush: '不能找到刷子: ',
           brushNotHtmlScript: '刷子没有配置html-script选项',
           alert : "",
           aboutDialog: origAbout
    };

    SyntaxHighlighter.all();
})();
