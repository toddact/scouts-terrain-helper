# Development

## content_script vs. background script

To activate autorefresh onclick replace in manfesit.json

```javascript
    "content_scripts": [
		{
			"matches": [
				"https://terrain.scouts.com.au/*"
			],
			"js": [
				"reports.js"
			],
			"css": [
				"reports.css"
			]
		}
	],
```

with  

```javascript
"background": {
    "persistent": false,
    "scripts": [
        "background.js"
    ]
},
```

