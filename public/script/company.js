$(document).ready(function () {
    $('#SHOWcREATE').click(function (e) {
        e.preventDefault();
        $('#cardSection').removeClass('d-none');
    });
    $('#canselCreate').click(function (e) {
        e.preventDefault();
        $('#cardSection').addClass('d-none');
    });
    let cardsLength = $('.countCard').length;
    for (let i = 0; i < cardsLength; i++) {
        $(`#btnDelete${i}`).click(function (e) {
            const Cname = $(`#btnDelete${i}`).attr("Cname");
            e.preventDefault();
            $.ajax({
                type: "delete",
                url: `http://localhost:3000/company/${Cname}`,
                success: function (response) {
                    $(`.${Cname}`).remove();
                },
                error: function (xhr, _ajaxOptions, _thrownError) {
                    alert(xhr.status);
                    alert(xhr.responseText);
                }
            });
        });
    }
    for (let i = 0; i < cardsLength; i++) {
        $(`#btnUpdate${i}`).click(function (e) {
            e.preventDefault();
            const Cname = $(`#btnUpdate${i}`).attr("Cname");
            $(`#btnDone${i}`).removeClass('d-none');
            $(`#Cname${i}`).removeClass('d-none');
            $(`#city${i}`).removeClass('d-none');
            $(`#province${i}`).removeClass('d-none');
            $(`#phoneNumber${i}`).removeClass('d-none');
            $(`#registrationNumber${i}`).removeClass('d-none');
            $(`#btnDone${i}`).click(function (e) {
                e.preventDefault();
                let data = {};
                if ($(`#Cname${i}`).val() !== "" && $(`#Cname${i}`).val() !== undefined && $(`#Cname${i}`).val()) {
                    data.Cname = $(`#Cname${i}`).val();
                }
                if ($(`#city${i}`).val() !== "" && $(`#city${i}`).val() !== undefined && $(`#city${i}`).val()) {
                    data.city = $(`#city${i}`).val();
                }
                if ($(`#province${i}`).val() !== "" && $(`#province${i}`).val() !== undefined && $(`#province${i}`).val()) {
                    data.province = $(`#province${i}`).val();
                }
                if ($(`#phoneNumber${i}`).val() !== "" && $(`#phoneNumber${i}`).val() !== undefined && $(`#phoneNumber${i}`).val()) {
                    data.phoneNumber = $(`#phoneNumber${i}`).val();
                }
                if ($(`#registrationNumber${i}`).val() !== "" && $(`#registrationNumber${i}`).val() !== undefined && $(`#registrationNumber${i}`).val()) {
                    data.registrationNumber = $(`#registrationNumber${i}`).val();
                }
                $.ajax({
                    url: `http://localhost:3000/company/${Cname}`,
                    type: 'PUT',
                    data: data,
                    success: function (data) {
                        window.location.href = `http://localhost:3000/company`;
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(xhr.responseText);
                    }
                });
                $(`#btnDone${i}`).addClass('d-none');
                $(`#Cname${i}`).addClass('d-none');
                $(`#city${i}`).addClass('d-none');
                $(`#province${i}`).addClass('d-none');
                $(`#phoneNumber${i}`).addClass('d-none');
                $(`#registrationNumber${i}`).addClass('d-none');
            });
        });
    }
});