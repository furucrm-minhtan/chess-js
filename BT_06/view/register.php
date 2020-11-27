<body>
    <div class="container">;
        <div class="header">
            <h1>Dang Ky hoc phan</h1>
        </div>

        <div class="main-content">
            <div class="content">
                <form action="">
                    <div class="form-input">
                        <label for="">Ma so</label>
                        <div>
                            <input class="w-50" type="text" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Ho va ten</label>
                        <div>
                            <input class="w-50" type="text" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Dia chi</label>
                        <div>
                            <input class="w-50" type="text" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Dien thoai</label>
                        <div>
                            <input class="w-50" type="text" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Gioi tinh</label>
                        <div class="radio-input">
                            <label for="nam">Nam</label>
                            <input type="radio" name="nam" />
                            <label for="nu">Nu</label>
                            <input type="radio" name="nu" />
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Ngay sinh</label>
                        <div class="w-50 input-date">
                            <div>
                                <select></select>
                            </div>
                            <div>
                                <select></select>
                            </div>
                            <div>
                                <select></select>
                            </div>
                        </div>
                    </div>
                    <div class="form-input">
                        <label for="">Email</label>
                        <div>
                            <input class="w-50" type="text" />
                        </div>
                    </div>
                    <div class="form-input">
                        <div class="mult-picklist-input">
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
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="./build/registrant.js"></script>
</body>