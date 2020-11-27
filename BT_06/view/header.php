<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title></title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <style type="text/css">
        html,
        body {
            height: 100%;
        }

        body {
            background-image: url('./public/background.jpg');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        * {
            margin: 0;
            padding: 0;
        }

        @keyframes input-focus {
            from {
                border-color: #9ba4b4;
            }

            to {
                border-color: #0960bd
            }
        }

        .container {
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            grid-template-areas:
                "header"
                "main-content"
        }

        .header {
            grid-area: header;
            text-align: center;
        }

        .w-25 {
            width: 25%;
        }

        .w-50 {
            width: 50%;
        }

        .w-75 {
            width: 50%;
        }

        .ml-at {
            margin-left: auto;
        }

        .main-content {
            grid-area: main-content;
        }

        .content {
            width: 75%;
            margin: 20px auto 20px auto;
            border-radius: 12px;
            background: #f1f6f9;
        }

        .form-input {
            display: flex;
            align-items: center;
        }

        .form-input>div {
            text-align: start;
            margin: 10px 5px 10px 5px;
            flex: 70%
        }

        .form-input>label {
            margin: 10px 5px 10px 5px;
            text-align: end;
            flex: 30%;
        }

        .form-input input[type="text"] {
            padding: 5px 5px 5px 0;
            width: 50%;
            border-color: #9ba4b4;
            border-style: none none solid none;
            background: transparent;
        }

        .form-input input[type="text"]:active,
        .form-input input[type="text"]:focus {
            outline: none;
            transition: 2s;
            border-color: #0960bd
        }

        .radio-input {
            display: flex;
            align-items: center;
        }

        .radio-input>input[type="radio"] {
            margin: 0 5px 0 5px;
        }

        .input-date {
            display: flex;
            flex-direction: row;
        }

        .input-date>div {
            margin-right: 10px;
        }

        .input-date>select {
            width: 20%;
        }

        .mult-picklist-input {
            display: flex;
            flex-direction: row;
        }

        .mult-picklist-input>div:not(:nth-child(2)) {
            flex-grow: inherit;
            display: flex;
            flex-direction: column;
            margin: 10px;
        }

        .mult-picklist-input>div:nth-child(1) {
            text-align: end;
        }

        .mult-picklist-input>div:nth-child(3) {
            text-align: start;
        }

        .mult-picklist-input>.button-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .button-group button {
            margin: 10px;
        }

        select[multiple="true"] {
            width: 50%;
        }

        .form-input-muilt-picklist>div>label,
        .form-input-muilt-picklist>div>input {
            width: 100%;
        }
    </style>
</head>