package ewallet.backend.dto.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_chatDao;
import ewallet.backend.dao.tbl_chat_historyDao;
import ewallet.backend.dao.tbl_profile_pictureDao;
import ewallet.backend.dto.ChatHistoryDto;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.model.tbl_profile_picture;
import ewallet.backend.service.ChatFeatureService;

@Service
public class ChatHistoryDtoMapper implements Function<tbl_chat_history, ChatHistoryDto> {
    @Autowired
    private ChatFeatureService chatFeatureService;

    @Autowired
    private tbl_chat_historyDao tbl_chat_historyDao;

    @Autowired
    private tbl_chatDao tbl_chatDao;

    @Autowired
    private ChatSessionDtoMapper chatSessionDtoMapper;

    @Autowired
    private tbl_profile_pictureDao tbl_profile_pictureDao; 

    @Override
    public ChatHistoryDto apply(tbl_chat_history history) {

        List<ChatSessionDto> chatSessions = tbl_chatDao.getChatSession(history.getUser_id(), history.getRecipient_id())
        .stream()
        .map(chatSessionDtoMapper).collect(Collectors.toList());

        if(chatSessions.size() != 0)
        {
            Collections.sort(chatSessions, Comparator.comparing(ChatSessionDto::created_at));
        }

        ChatSessionDto lastChatSession = chatSessions.isEmpty() ? null : chatSessions.get(chatSessions.size() - 1);

        tbl_profile_picture userProfile = tbl_profile_pictureDao.getSingleProfileRecord(history.getRecipient_id());

        if(userProfile != null)
        {
            history.setProfilePicture(userProfile.getProfile_picture());
        }

        history.setLast_message(lastChatSession.message());
        history.setCreated_at(lastChatSession.created_at());

        return new ChatHistoryDto(
            history.getUser_id(),
            history.getRecipient_id(),
            history.getUsername(),
            history.getFirst_name(),
            history.getMiddle_name(),
            history.getLast_name(),
            history.getLast_message(),
            history.getProfilePicture(),
            history.getCreated_at(),
            history.getUpdated_at()
        );
    }

}
