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
            const nationalCode = $(`#btnDelete${i}`).attr("nationalCode");
            e.preventDefault();
            $.ajax({
                type: "delete",
                url: `http://localhost:3000/employee/${nationalCode}`,
                success: function (response) {
                    $(`.${nationalCode}`).remove();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(xhr.responseText);
                }
            });
        });
    }
    for (let i = 0; i < cardsLength; i++) {
        $(`#btnUpdate${i}`).click(function (e) {
            e.preventDefault();
            const nationalCode = $(`#btnUpdate${i}`).attr("nationalCode");
            $(`#btnDone${i}`).removeClass('d-none');
            $(`#firstName${i}`).removeClass('d-none');
            $(`#lastName${i}`).removeClass('d-none');
            $(`#city${i}`).removeClass('d-none');
            $(`#nationalCode${i}`).removeClass('d-none');
            $(`#gender${i}`).removeClass('d-none');
            $(`#dateOfBirth${i}`).removeClass('d-none');
            $(`#company${i}`).removeClass('d-none');
            // let data = {
            //     Cname: $(`#Cname${i}`).val(),
            //     city: $(`#city${i}`).val(),
            //     province: $(`#province${i}`).val(),
            //     phoneNumber: $(`#phoneNumber${i}`).val(),
            //     registrationNumber: $(`#registrationNumber${i}`).val()
            // };
            $(`#btnDone${i}`).click(function (e) {
                e.preventDefault();
                let data = {};
                if ($(`#firstName${i}`).val() !== "" && $(`#firstName${i}`).val() !== undefined && $(`#firstName${i}`).val()) {
                    data.firstName = $(`#firstName${i}`).val();
                }
                if ($(`#lastName${i}`).val() !== "" && $(`#lastName${i}`).val() !== undefined && $(`#lastName${i}`).val()) {
                    data.lastName = $(`#lastName${i}`).val();
                }
                if ($(`#city${i}`).val() !== "" && $(`#city${i}`).val() !== undefined && $(`#city${i}`).val()) {
                    data.city = $(`#city${i}`).val();
                }
                if ($(`#nationalCode${i}`).val() !== "" && $(`#nationalCode${i}`).val() !== undefined && $(`#nationalCode${i}`).val()) {
                    data.nationalCode = $(`#nationalCode${i}`).val();
                }
                if ($(`#gender${i}`).val() !== "" && $(`#gender${i}`).val() !== undefined && $(`#gender${i}`).val()) {
                    data.gender = $(`#gender${i}`).val();
                }
                if ($(`#dateOfBirth${i}`).val() !== "" && $(`#dateOfBirth${i}`).val() !== undefined && $(`#dateOfBirth${i}`).val()) {
                    data.dateOfBirth = $(`#dateOfBirth${i}`).val();
                }

                if ($(`#company${i}`).val() !== "" && $(`#company${i}`).val() !== undefined && $(`#company${i}`).val()) {
                    data.company = $(`#company${i}`).val();
                }
                $.ajax({
                    url: `http://localhost:3000/employee/${nationalCode}`,
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
                // $.ajax({
                //     type: "PUT",
                //     url: `http://localhost:3000/company/${Cname}`,
                //     data: data,
                //     dataType: "aplication/json",
                //     success: function (response) {
                //         console.log(response);
                //         if (response === "success") {
                //             window.location.href = `http://localhost:3000/company`;
                //         }
                // console.log('x');
                // console.log(response);
                // if (response.status === 200) {
                //     console.log('x');
                //     $(`#Cname${i}`).val(response.Cname);
                //     $(`#city${i}`).val(response.city);
                //     $(`#province${i}`).val(response.province);
                //     $(`#phoneNumber${i}`).val(response.phoneNumber);
                //     $(`#registrationNumber${i}`).val(response.registrationNumber);
                // }
                //     },
                // });
                $(`#btnDone${i}`).addClass('d-none');
                $(`#firstName${i}`).addClass('d-none');
                $(`#lastName${i}`).addClass('d-none');
                $(`#city${i}`).addClass('d-none');
                $(`#nationalCode${i}`).addClass('d-none');
                $(`#gender${i}`).addClass('d-none');
                $(`#dateOfBirth${i}`).addClass('d-none');
                $(`#company${i}`).removeClass('d-none');
            });
        });
    }
});