/**
 * plugin.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('preview', function(editor) {
	editor.addCommand('mcePreview', function() {
		editor.windowManager.open({
			title: 'Preview',
			width : parseInt(editor.getParam("plugin_preview_width", "650"), 10),
			height : parseInt(editor.getParam("plugin_preview_height", "500"), 10),
			html: '<iframe src="javascript:\'\'" frameborder="0"></iframe>',
			buttons: {
				text: 'Close',
				onclick: function() {
					this.parent().parent().close();
				}
			},
			onPostRender: function() {
				var doc = this.getEl('body').firstChild.contentWindow.document, previewHtml, headHtml = '';

				tinymce.each(tinymce.explode(editor.settings.content_css), function(url) {
					headHtml += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
				});
				tinymce.each(tinymce.explode(editor.settings.content_js), function(url) {
					headHtml += '<script type="text/javascript" src="' + editor.documentBaseURI.toAbsolute(url) + '"></script>';
				});

                                var clipboardSwfUrl = editor.documentBaseURI.toAbsolute(editor.settings.clipboardSwf || "libs/js/syntaxhighlighter2/clipboard.swf");
                                var syntaxhlInit = 
"(" + function(swfUrl){
    var origAbout = SyntaxHighlighter.config.strings.aboutDialog;
    SyntaxHighlighter.config.clipboardSwf = swfUrl;
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
} + ")('" + clipboardSwfUrl + "');";
				previewHtml = (
					'<!DOCTYPE html>' +
					'<html>' +
					'<head>' +
						headHtml +
					'</head>' +
					'<body>' +
						editor.getContent() +
                                            '<script type="text/javascript">' +
                                                syntaxhlInit +
                                            '</script>' +
					'</body>' +
					'</html>'
				);

				doc.open();
				doc.write(previewHtml);
				doc.close();
			}
		});
	});

	editor.addButton('preview', {
		title : 'Preview',
		cmd : 'mcePreview'
	});

	editor.addMenuItem('preview', {
		text : 'Preview',
		cmd : 'mcePreview',
		context: 'view'
	});
});
