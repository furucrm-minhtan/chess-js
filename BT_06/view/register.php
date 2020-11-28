<body>
    <div class="container">;
        <div class="header">
            <h1>Dang Ky hoc phan</h1>
        </div>

        <div class="main-content">
            <div class="content">
                <form>
                    <div class="form-input">
                        <label for="code">Ma so</label>
                        <div>
                            <input id="code" name="code" class="w-50" type="text" required="true" />
                        </div>
                        <div id="code-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <label for="name">Ho va ten</label>
                        <div>
                            <input id="name" name="name" class="w-50" type="text" required="true" />
                        </div>
                        <div id="name-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <label for="address">Dia chi</label>
                        <div>
                            <input id="address" name="address" class="w-50" type="text" required="true" />
                        </div>
                        <div id="address-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <label for="phone">Dien thoai</label>
                        <div>
                            <input id="phone" name="phone" class="w-50" type="text" required="true" />
                        </div>
                        <div id="phone-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <label for="">Gioi tinh</label>
                        <div class="radio-input">
                            <label for="nam">Nam</label>
                            <input type="radio" name="gender" id="male" required="true" value="Male" />
                            <label for="nu">Nu</label>
                            <input type="radio" name="gender" id="female" value="Female" />
                        </div>
                        <div id="gender-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <label for="birth-date">Ngay sinh</label>
                        <div id="group-date" class="group-date">
                            <div>
                                <select>
                                </select>
                            </div>
                            <span>,</span>
                            <div>
                                <input type="text" />
                            </div>
                            <span>,</span>
                            <div>
                                <input type="text" />
                            </div>
                            <input class="is-hide" id="birth-date" name="birthdate" type="date" required="true" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="email">Email</label>
                        <div>
                            <input id="email" name="email" class="w-50" type="text" required="true" />
                        </div>
                        <div id="email-error" class="feedback"></div>
                    </div>
                    <div class="form-input">
                        <div class="mult-picklist-input f-100">
                            <div>
                                <label for="choose">Cac mon hoc</label>
                                <div id="select-subjects"></div>
                            </div>
                            <div class="button-group">
                                <button id="select" type="button">
                                    <span class="material-icons">
                                        chevron_right
                                    </span>
                                </button>
                                <button id="select" type="button">
                                    <span class="material-icons">
                                        chevron_right
                                    </span>
                                </button>
                                <button id="selected" type="button">
                                    <span class="material-icons">
                                        chevron_left
                                    </span>
                                </button>
                                <button id="selected" type="button">
                                    <span class="material-icons">
                                        chevron_left
                                    </span>
                                </button>
                            </div>
                            <div>
                                <label for="selected">Cac mon da chon</label>
                                <div id="selected-subjects"></div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button id="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
                <div class="table">
                    <table class="w-75">
                        <thead>
                            <th id="code-col">Ma So</th>
                            <th id="name-col">Ho va ten</th>
                            <th id="gender-col">Gioi tinh</th>
                            <th id="birth-col">Ngay sinh</th>
                        </thead>
                        <tbody id="content">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="./build/registrant.js"></script>
</body>